const db = require("../../utils/database");
const { signAccessToken, verifyRefreshToken } = require("../../utils/token");

async function getDetailInfo(id) {
  try {
    const [data] = await db.execute(`
      SELECT
        uuid, name, gender, birth_day, phone,
        email, permission_id, created_at, updated_at
      FROM 
        \`user\`
      WHERE 
        \`uuid\` = '${id}'
    `);

    return {
      code: 200,
      data: data ?? null,
    };
  } catch (error) {
    throw error;
  }
}

async function login(user) {
  try {
    const [rows] = await db.execute(`
      SELECT  
        uuid, name, permission_id
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
          \`refresh_token\`
        )
        VALUES(
          uuid(),
          '${uuid}',
          '${token.access_token}',
          '${token.refresh_token}'
        )
      `,
    ]);

    return {
      code: 200,
      data: {
        uuid: uuid ?? null,
        name: rows.name ?? null,
        permission: rows.permission_id ?? null,
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
          \`refresh_token\`
        )
        VALUES(
          uuid(),
          '${payload.id}',
          '${token.access_token}',
          '${token.refresh_token}'
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

    if (body.email == null || body.email == "") {
      const error = new Error("Vui lòng nhập email!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE 
        \`user\` 
      SET
        \`name\` = '${body.name}',
        \`gender\` = ${body.gender == null ? null : `'${body.gender}'`},
        \`birth_day\` = ${
          body.birth_day == null ? null : `'${body.birth_day}'`
        },
        \`phone\` = '${body.phone}',
        \`email\` = '${body.email}',
        \`permission_id\` = ${body.permission_id}
      WHERE 
        \`uuid\` = '${uuid}'
    `);

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

module.exports = {
  getDetailInfo,
  login,
  refreshToken,
  updateProfile,
  changePassword,
  changeStatus
};
