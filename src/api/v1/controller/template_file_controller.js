const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListTemplateFile({
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
        \`templatefile\`
      WHERE 
        (((\`user_id\` = '${user_id}' AND \`type\` = 0) ||
        \`type\` = 1) AND
        (\`name\` LIKE '%${keyword}%' OR 
        \`note\` LIKE '%${keyword}%')) AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`templatefile\`.\`created_at\` DESC
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

    if (body.typetemplatefile_id == null || body.typetemplatefile_id == "") {
      const error = new Error("Vui lòng chọn loại file mẫu!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`templatefile\`(
        \`uuid\`,
        \`user_id\`,
        \`typetemplatefile_id\`,
        \`name\`,
        \`file\`,
        \`type\`,
        \`status\`,
        \`note\`
      )
      VALUES(
        UUID(),
        '${user_id}',
        '${body.typetemplatefile_id}',
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

    if (body.typetemplatefile_id == null || body.typetemplatefile_id == "") {
      const error = new Error("Vui lòng chọn loại file mẫu!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`templatefile\`
      SET
        \`user_id\` = '${user_id}',
        \`typetemplatefile_id\` = '${body.typetemplatefile_id}',
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

async function deleteTemplateFile({ uuid }) {
  try {
    await db.execute(`
      UPDATE
        \`templatefile\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      data: 'Đã xóa file mẫu thành công!',
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTemplateFile,
  createTemplateFile,
  updateTemplateFile,
  changeStatusTemplateFile,
  deleteTemplateFile,
};
