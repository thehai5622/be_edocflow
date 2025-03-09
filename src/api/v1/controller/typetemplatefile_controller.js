const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListTypeTemplateFile({
  user_id,
  keyword = "",
  page = 1,
  limit = 12,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const data = await db.execute(`
      SELECT
        *
      FROM
        \`typetemplatefile\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = 0
      ORDER BY \`typetemplatefile\`.\`created_at\` DESC
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

async function createTypeTemplateFile({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`typetemplatefile\`(
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
      data: "Đã thêm loại file mẫu thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateTypeTemplateFile({ uuid, user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`typetemplatefile\`
      SET
        \`name\` = '${body.name}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã chỉnh sửa thông tin loại file mẫu thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteTypeTemplateFile({ uuid, user_id, body }) {
  try {
    await db.execute(`
      UPDATE
        \`typetemplatefile\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: "Đã xóa loại file mẫu thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTypeTemplateFile,
  createTypeTemplateFile,
  updateTypeTemplateFile,
  deleteTypeTemplateFile,
};
