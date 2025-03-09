const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListField({
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
        \`field\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`field\`.\`created_at\` DESC
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

async function createField({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`field\`(
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
      data: "Đã thêm lĩnh vực thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateField({ uuid, user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`field\`
      SET
        \`name\` = '${body.name}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã chỉnh sửa thông tin lĩnh vực thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteField({ uuid, user_id, body }) {
  try {
    await db.execute(`
      UPDATE
        \`field\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã xóa lĩnh vực thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListField,
  createField,
  updateField,
  deleteField,
};
