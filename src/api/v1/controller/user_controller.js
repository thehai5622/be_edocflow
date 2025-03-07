const db = require("../../utils/database");
const { signAccessToken, verifyAccessToken, verifyRefreshToken } = require("../../utils/token");

async function getDetailInfo(id) {
  try {
    const [data] = await db.execute(
      `SELECT
        uuid, name, gender, birth_day, phone,
        email, permission_id, create_at, update_at
        FROM \`user\`
        WHERE \`uuid\` = '${id}'`
    );

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
    const [rows] = await db.execute(
      `SELECT  
          uuid, name, permission_id
          FROM \`user\` 
          WHERE \`username\` = '${user.username}'
          AND \`password\` = '${user.password}'`
    );

    if (rows == null) {
      const error = new Error(
        "Thông tin tài khoản hoặc mật khẩu không chính xác!"
      );
      error.statusCode = 401;
      throw error;
    }

    const uuid = rows.uuid;
    const token = await signAccessToken(uuid);

    return {
      code: 200,
      data: {
        uuid: uuid ?? null,
        name: rows.name ?? null,
        permission: rows.permission_id ?? null,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function refreshToken(body) {
  try {
    const uuid = body.uuid;
    const token = await verifyRefreshToken(body.refreshToken);

    return {
      code: 200,
      data: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function testAT(body) {
  try {
    const token = await verifyAccessToken(body.token);

    return {
      code: 200,
      data: {
        token: token,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function testRT(body) {
  try {
    const token = await verifyRefreshToken(body.token);

    return {
      code: 200,
      data: {
        token: token,
      },
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDetailInfo,
  login,
  refreshToken,
  testAT,
  testRT,
};
