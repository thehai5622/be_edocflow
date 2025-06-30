const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getAdministrativeLevel({
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT
        *
      FROM
        \`administrativelevel\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`administrativelevel\`.\`created_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`administrativelevel\` WHERE \`name\` LIKE '%${keyword}%' AND \`is_removed\` = ${isRecycleBin}`,
    ]);
    const totalCount = result[1][0].total;

    return {
      code: 200,
      data: result[0] ?? null,
      pagination: {
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function getListAL({ keyword = "" }) {
  try {
    const result = await db.execute(
      `SELECT
        *
      FROM
        \`administrativelevel\`
      WHERE
        \`name\` LIKE '%${keyword}%'
      ORDER BY \`administrativelevel\`.\`created_at\` DESC`
    );

    return {
      code: 200,
      data: result ?? null,
    };
  } catch (error) {
    throw error;
  }
}

async function createAdministrativeLevel({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Tên cấp hành chính là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`administrativelevel\`(
        \`name\`
      )
      VALUES(
        '${body.name}'
      )
    `);

    return {
      code: 200,
      message: "Đã thêm cấp hành chính thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateAdministrativeLevel({ uuid, user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Tên cấp hành chính là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`administrativelevel\`
      SET
        \`name\` = '${body.name}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Đã chỉnh sửa thông tin cấp hành chính thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteAdministrativeLevel({ uuid, user_id, body }) {
  try {
    await db.execute(`
      UPDATE
        \`administrativelevel\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Đã xóa cấp hành chính thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAdministrativeLevel,
  getListAL,
  createAdministrativeLevel,
  updateAdministrativeLevel,
  deleteAdministrativeLevel,
};
