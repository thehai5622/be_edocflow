const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListTypeTemplateFile({
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
        \`typetemplatefile\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`typetemplatefile\`.\`created_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`typetemplatefile\` WHERE \`name\` LIKE '%${keyword}%' AND is_removed = ${isRecycleBin}`,
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

async function getListTTF({
  keyword = "",
}) {
  try {
    const result = await db.execute(`
      SELECT
        *
      FROM
        \`typetemplatefile\`
      WHERE
        \`name\` LIKE '%${keyword}%' AND
        \`is_removed\` = 0
    `);

    return {
      code: 200,
      data: result ?? null,
    };
  } catch (error) {
    throw error;
  }
}

async function createTypeFile({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Tên loại file là trường bắt buộc!");
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
      message: "Đã thêm loại file thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateTypeFile({ uuid, user_id, body }) {
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
      message: "Đã chỉnh sửa thông tin loại file thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteTypeFile({ uuid, user_id, body }) {
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
      message: "Đã xóa loại file thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTypeTemplateFile,
  getListTTF,
  createTypeFile,
  updateTypeFile,
  deleteTypeFile,
};
