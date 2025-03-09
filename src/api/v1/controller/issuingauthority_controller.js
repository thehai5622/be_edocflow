const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getIssuingAuthority({
  user_id,
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const data = await db.execute(`
      SELECT
        *
      FROM
        \`issuingauthority\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin} AND
      ORDER BY \`issuingauthority\`.\`created_at\` DESC
        LIMIT ${offset}, ${limit}
    `);

    return {
      code: 200,
      data: data ?? null,
    };
  } catch (error) {
    throw error;
  }
}

async function createIssuingAuthority({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`issuingauthority\`(
        \`uuid\`,
        \`name\`
      )
      VALUES(
        UUID(),
        '${body.name}'
      )
    `);

    return {
      code: 200,
      data: "Đã thêm cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateIssuingAuthority({ uuid, user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`issuingauthority\`
      SET
        \`name\` = '${body.name}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã chỉnh sửa thông tin cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteIssuingAuthority({ uuid, user_id, body }) {
  try {
    await db.execute(`
      UPDATE
        \`issuingauthority\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã xóa cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getIssuingAuthority,
  createIssuingAuthority,
  updateIssuingAuthority,
  deleteIssuingAuthority,
};
