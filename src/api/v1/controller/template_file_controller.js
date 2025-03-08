const db = require("../../utils/database");

async function getListTemplateFile({
  user_id,
  keyword = "",
  page = 1,
  limit = 12
}) {
  try {
    // const offset = helper.getOffset(page, limit);

    const data = await db.execute(`
      SELECT 
        * 
      FROM 
        \`templatefile\`
      WHERE 
        (\`user_id\` = '${user_id}' AND \`type\` = 0) ||
        \`type\` = 1
    `);

    return {
      code: 200,
      data: data ?? null,
    };
  } catch (error) {
    throw error;
  }
}

async function createTemplateFile({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    if (body.file == null || body.file == "") {
      const error = new Error("Vui lòng chọn file!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`templatefile\`(
        \`uuid\`,
        \`user_id\`,
        \`name\`,
        \`file\`,
        \`type\`,
        \`status\`,
        \`note\`
      )
      VALUES(
        UUID(),
        '${user_id}',
        '${body.name}',
        '${body.file}',
        ${body.type},
        ${body.status},
        '${body.note == null ? "" : body.note}'
      )
    `);

    return {
      code: 200,
      data: 'Đã thêm file mẫu thành công!',
    };
  } catch (error) {
    throw error;
  }
}

async function updateTemplateFile({ uuid, user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }

    if (body.file == null || body.file == "") {
      const error = new Error("Vui lòng chọn file!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`templatefile\`
      SET
        \`user_id\` = '${user_id}',
        \`name\` = '${body.name}',
        \`file\` = '${body.file}',
        \`type\` = '${body.type}',
        \`note\` = '${body.note == null ? "" : body.note}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: 'Đã chỉnh sửa thông tin file mẫu thành công!',
    };
  } catch (error) {
    throw error;
  }
}

async function changeStatusTemplateFile({ uuid, user_id, body }) {
  try {
    if (body.status == null) {
      const error = new Error("Vui lòng nhập trạng thái!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`templatefile\`
      SET
        \`user_id\` = '${user_id}',
        \`status\` = ${body.status}
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: 'Đã chỉnh sửa thông tin file mẫu thành công!',
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTemplateFile,
  createTemplateFile,
  updateTemplateFile,
  changeStatusTemplateFile
};
