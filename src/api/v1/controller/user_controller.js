const db = require("../../utils/database");
const { signAccessToken, verifyRefreshToken } = require("../../utils/token");
const { deleteFile } = require("../controller/file_controller");
const offsetUtils = require("../../utils/offset");

async function getDetailInfo(id) {
  try {
    const [result] = await db.execute(
      `
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
        \`user\`.\`status\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`,
        \`permission\`.\`uuid\` AS \`p_uuid\`,
        \`permission\`.\`name\` AS \`p_name\`,
        \`department\`.\`uuid\` AS \`d_uuid\`,
        \`department\`.\`name\` AS \`d_name\`
      FROM
        \`user\`
      INNER JOIN \`issuingauthority\` ON \`issuingauthority\`.\`uuid\` = \`user\`.\`issuingauthority_id\`
      INNER JOIN \`permission\` ON \`permission\`.\`uuid\` = \`user\`.\`permission_id\`
      INNER JOIN \`department\` ON \`department\`.\`uuid\` = \`user\`.\`department_id\`
      WHERE
        \`user\`.\`uuid\` = ?
    `,
      [id]
    );

    const data =
      result == null
        ? null
        : {
            uuid: result.uuid,
            name: result.name,
            avatar: result.avatar,
            gender: result.gender,
            birth_day: result.birth_day,
            phone: result.phone,
            email: result.email,
            created_at: result.created_at,
            updated_at: result.updated_at,
            status: result.status,
            issuing_authority: {
              uuid: result.ia_uuid,
              name: result.ia_name,
            },
            permission: {
              uuid: result.p_uuid,
              name: result.p_name,
            },
            department: {
              uuid: result.d_uuid,
              name: result.d_name,
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
        \`user\`.\`status\`,
        \`permission\`.\`uuid\` AS \`p_uuid\`,
        \`permission\`.\`name\` AS \`p_name\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`
      FROM
        \`user\`
      LEFT JOIN \`permission\` ON \`user\`.\`permission_id\` = \`permission\`.\`uuid\`
      LEFT JOIN \`issuingauthority\` ON \`user\`.\`issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      LEFT JOIN \`department\` ON \`user\`.\`department_id\` = \`department\`.\`uuid\`
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
              status: item.status,
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
    if (body.permission == null) {
      const error = new Error("Quyền của cán bộ là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.issuing_authority == null || body.issuing_authority == "") {
      const error = new Error("Thuộc cơ quan ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.name == null || body.name == "") {
      const error = new Error("Tên cán bộ là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.gender == null) {
      const error = new Error("Giới tính là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.birth_day == null || body.birth_day == "") {
      const error = new Error("Ngày sinh là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.phone == null || body.phone == "") {
      const error = new Error("Số điện thoại là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      INSERT INTO \`user\`(
        \`uuid\`,
        \`permission_id\`,
        \`issuingauthority_id\`,
        \`name\`,
        \`gender\`,
        \`birth_day\`,
        \`phone\`,
        \`email\`,
        \`avatar\`
      )
      VALUES(
        UUID(),
        ?, ?, ?, ?, ?, ?, ?, ?
      )   
    `,
      [
        body.permission,
        body.issuing_authority,
        body.name,
        body.gender,
        body.birth_day,
        body.phone,
        body.email || null,
        body.avatar || null,
      ]
    );

    return {
      code: 200,
      message: "Đã thêm thông tin cán bộ thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateUser(uuid, body) {
  try {
    await db.execute(
      `
      UPDATE 
        \`user\` 
      SET
        \`permission_id\` = ?,
        \`issuingauthority_id\` = ?
      WHERE 
        \`uuid\` = ?
    `,
      [
        body.permission,
        body.issuing_authority,
        uuid,
      ]
    );

    return {
      code: 200,
      message: "Đã cập nhật thông tin cán bộ!",
    };
  } catch (error) {
    throw error;
  }
}

async function provideAccount(uuid, body) {
  try {
    await db.execute(
      `
      UPDATE 
        \`user\` 
      SET
        \`username\` = ?,
        \`password\` = ?
      WHERE 
        \`uuid\` = ?
    `,
      [
        body.username,
        body.password,
        uuid,
      ]
    );

    return {
      code: 200,
      message: "Đã cấp tài khoản cho cán bộ!",
    };
  } catch (error) {
    throw error;
  }
}

async function resetPassword(uuid, body) {
  try {
    await db.execute(
      `
      UPDATE 
        \`user\` 
      SET
        \`password\` = ?
      WHERE 
        \`uuid\` = ?
    `,
      [
        body.password,
        uuid,
      ]
    );

    return {
      code: 200,
      message: "Đã đặt lại mật khẩu mặc định cho cán bộ!",
    };
  } catch (error) {
    throw error;
  }
}

async function login(user) {
  try {
    const [rows] = await db.execute(`
      SELECT  
        \`uuid\`, \`name\`, \`avatar\`, \`permission_id\`, \`issuingauthority_id\`, \`status\`
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

    if (rows.status == 0) {
      const error = new Error(
        "Tài khoản này đã bị khóa!"
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

async function changeStatus(user_id, uuid, status) {
  try {
    if (user_id == uuid) {
      const error = new Error("Không thể tự thao tác này trên bản thân!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE 
        \`user\` 
      SET
        \`status\` = ?
      WHERE 
        \`uuid\` = ?
    `, [
      status,
      uuid
    ]);

    return {
      code: 200,
      message: "Đã đổi trạng thái!",
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
  updateUser,
  provideAccount,
  resetPassword,
  login,
  refreshToken,
  updateProfile,
  changePassword,
  changeStatus,
  logout,
};
