const db = require("../../utils/database");
const { signAccessToken, verifyRefreshToken } = require("../../utils/token");
const { deleteFile } = require("../controller/file_controller");

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
  login,
  refreshToken,
  updateProfile,
  changePassword,
  changeStatus,
  logout,
};
