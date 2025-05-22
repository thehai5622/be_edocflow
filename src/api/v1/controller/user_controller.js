const db = require("../../utils/database");
const { signAccessToken, verifyRefreshToken } = require("../../utils/token");
const { deleteFile } = require("../controller/file_controller");
const offsetUtils = require("../../utils/offset");

async function getDetailInfo(id) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`user\`.\`uuid\`,
        \`user\`.\`name\`,
        \`user\`.\`avatar\`,
        \`user\`.\`gender\`,
        \`user\`.\`birth_day\`,
        \`user\`.\`phone\`,
        \`user\`.\`email\`,
        \`user\`.\`created_at\`,
        \`user\`.\`updated_at\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`,
        \`permission\`.\`uuid\` AS \`p_uuid\`,
        \`permission\`.\`name\` AS \`p_name\`
      FROM
        \`user\`
      INNER JOIN \`issuingauthority\` ON \`issuingauthority\`.\`uuid\` = \`user\`.\`issuingauthority_id\`
      INNER JOIN \`permission\` ON \`permission\`.\`uuid\` = \`user\`.\`permission_id\`
      WHERE
        \`user\`.\`uuid\` = '${id}'
    `);

    const data = result == null ? null : {
      uuid: result.uuid,
      name: result.name,
      avatar: result.avatar,
      gender: result.gender,
      birth_day: result.birth_day,
      phone: result.phone,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
      issuing_authority: {
        uuid: result.ia_uuid,
        name: result.ia_name,
      },
      permission: {
        uuid: result.p_uuid,
        name: result.p_name,
      },
    };

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}

async function getListUser({
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT
        \`user\`.\`uuid\`,
        \`user\`.\`name\`,
        \`user\`.\`gender\`,
        \`user\`.\`birth_day\`,
        \`user\`.\`phone\`,
        \`user\`.\`email\`,
        \`user\`.\`username\`,
        \`user\`.\`created_at\`,
        \`user\`.\`updated_at\`,
        \`user\`.\`avatar\`,
        \`permission\`.\`uuid\` AS \`p_uuid\`,
        \`permission\`.\`name\` AS \`p_name\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`
      FROM
        \`user\`
      LEFT JOIN \`permission\` ON \`user\`.\`permission_id\` = \`permission\`.\`uuid\`
      LEFT JOIN \`issuingauthority\` ON \`user\`.\`issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      WHERE
        \`user\`.\`name\` LIKE '%${keyword}%' OR \`user\`.\`uuid\` LIKE '%${keyword}%'
      ORDER BY \`user\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`user\` WHERE
        \`user\`.\`name\` LIKE '%${keyword}%' OR \`user\`.\`uuid\` LIKE '%${keyword}%'`,
    ]);
    const totalCount = result[1][0].total;
    const data =
      result[0] == null
        ? null
        : result[0].map((item) => {
            return {
              uuid: item.uuid,
              name: item.name,
              gender: item.gender,
              birth_day: item.birth_day,
              phone: item.phone,
              email: item.email,
              username: item.username,
              created_at: item.created_at,
              updated_at: item.updated_at,
              avatar: item.avatar,
              permission: {
                uuid: item.p_uuid,
                name: item.p_name,
              },
              issuing_authority: {
                uuid: item.ia_uuid,
                name: item.ia_name,
              },
            };
          });

    return {
      code: 200,
      data: data,
      pagination: {
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function createUser({ user_id, body }) {
  try {
    if (
      body.from_issuingauthority_id == null ||
      body.from_issuingauthority_id == ""
    ) {
      const error = new Error("Cơ quan ban hành gửi văn bản đi là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.issuing_authority == null || body.issuing_authority == "") {
      const error = new Error("Cơ quan ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.field == null || body.field == "") {
      const error = new Error("Lĩnh vực là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.template_file == null || body.template_file == "") {
      const error = new Error("File mẫu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.summary == null || body.summary == "") {
      const error = new Error("Trích yếu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.year == null) {
      const error = new Error("Năm ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.original_location == null || body.original_location == "") {
      const error = new Error("Nơi lưu trữ bản gốc là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.number_releases == null || body.number_releases == "") {
      const error = new Error("Số bản lưu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.urgency_level == null) {
      const error = new Error("Mức độ khẩn là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.confidentiality_level == null) {
      const error = new Error("Mức độ bảo mật là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`document\`(
        \`uuid\`,
        \`user_id\`,
        \`from_issuingauthority_id\`,
        \`issuingauthority_id\`,
        \`usersign_id\`,
        \`field_id\`,
        \`templatefile_id\`,
        \`summary\`,
        \`year\`,
        \`original_location\`,
        \`number_releases\`,
        \`status\`,
        \`urgency_level\`,
        \`confidentiality_level\`
      )
      VALUES(
        UUID(),
        '${user_id}',
        '${body.from_issuingauthority_id}',
        '${body.issuing_authority}',
        NULL,
        '${body.field}',
        '${body.template_file}',
        '${body.summary}',
        ${body.year},
        '${body.original_location}',
        ${body.number_releases},
        1,
        ${body.urgency_level},
        ${body.confidentiality_level}
      )
    `);

    return {
      code: 200,
      message: "Đã thêm thông tin cán bộ thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function login(user) {
  try {
    const [rows] = await db.execute(`
      SELECT  
        \`uuid\`, \`name\`, \`avatar\`, \`permission_id\`, \`issuingauthority_id\`
      FROM \`user\` 
      WHERE 
        \`username\` = '${user.username}'
        AND \`password\` = '${user.password}'
    `);

    if (rows == null) {
      const error = new Error(
        "Thông tin tài khoản hoặc mật khẩu không chính xác!"
      );
      error.statusCode = 400;
      throw error;
    }

    const uuid = rows.uuid;
    const token = await signAccessToken(uuid);

    await db.queryMultiple([
      `DELETE FROM \`token\` WHERE \`user_id\` = '${uuid}'`,
      `
        INSERT INTO \`token\`(
          \`uuid\`,
          \`user_id\`,
          \`access_token\`,
          \`refresh_token\`,
          \`fcm_token\`
        )
        VALUES(
          uuid(),
          '${uuid}',
          '${token.access_token}',
          '${token.refresh_token}',
          '${user.fcm_token}'
        )
      `,
    ]);

    return {
      code: 200,
      data: {
        uuid: uuid ?? null,
        name: rows.name ?? null,
        avatar: rows.avatar ?? null,
        permission: rows.permission_id ?? null,
        issuing_authority: rows.issuingauthority_id ?? null,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function refreshToken(body) {
  try {
    const payload = await verifyRefreshToken(body.token);
    const token = await signAccessToken(payload.id);

    await db.queryMultiple([
      `DELETE FROM \`token\` WHERE \`user_id\` = '${payload.id}'`,
      `
        INSERT INTO \`token\`(
          \`uuid\`,
          \`user_id\`,
          \`access_token\`,
          \`refresh_token\`,
          \`fcm_token\`
        )
        VALUES(
          uuid(),
          '${payload.id}',
          '${token.access_token}',
          '${token.refresh_token}',
          '${body.fcm_token}'
        )
      `,
    ]);

    return {
      code: 200,
      data: {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function updateProfile(uuid, body) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    if (body.phone == null || body.phone == "") {
      const error = new Error("Vui lòng nhập số diện thoại!");
      error.statusCode = 400;
      throw error;
    }

    let avatar;

    await db
      .execute(`SELECT \`avatar\` FROM \`user\` WHERE \`uuid\` = '${uuid}'`)
      .then((result) => {
        avatar = result[0].avatar;
      });

    await db.execute(`
      UPDATE 
        \`user\` 
      SET
        \`avatar\` = ${body.avatar == null ? null : `'${body.avatar}'`},
        \`name\` = '${body.name}',
        \`gender\` = ${body.gender == null ? null : `'${body.gender}'`},
        \`birth_day\` = ${body.birthDay == null ? null : `'${body.birthDay}'`},
        \`phone\` = '${body.phone}',
        \`email\` = ${body.email == null ? null : `'${body.email}'`}
      WHERE 
        \`uuid\` = '${uuid}'
    `);

    if (avatar != null && avatar !== body.avatar) {
      deleteFile(avatar);
    }

    return {
      code: 200,
      message: "Cập nhật thông tin thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function changePassword(uuid, body) {
  try {
    const [rows] = await db.execute(`
      SELECT  
        uuid
      FROM \`user\` 
      WHERE 
        \`uuid\` = '${uuid}'
        AND \`password\` = '${body.current_password}'
    `);

    if (rows == null) {
      const error = new Error("Mật khẩu hiện tại không chính xác!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE 
        \`user\` 
      SET
        \`password\` = '${body.password}'
      WHERE 
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Mật khẩu đã được thay đổi!",
    };
  } catch (error) {
    throw error;
  }
}

async function changeStatus(uuid, body) {
  try {
    // Thêm thay đổi trạng thái người dùng

    return {
      code: 200,
      message: "Chưa thay đổi trạng thái!",
    };
  } catch (error) {
    throw error;
  }
}

async function logout(uuid) {
  try {
    db.execute(`DELETE FROM \`token\` WHERE \`user_id\` = '${uuid}'`);

    return {
      code: 200,
      message: "Đăng xuất thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDetailInfo,
  getListUser,
  createUser,
  login,
  refreshToken,
  updateProfile,
  changePassword,
  changeStatus,
  logout,
};
