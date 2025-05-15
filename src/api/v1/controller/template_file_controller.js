const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");
const { deleteFile } = require("../controller/file_controller");

async function getListTemplateFile({
  user_id,
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT 
        \`templatefile\`.\`uuid\`,
        \`templatefile\`.\`name\`,
        \`templatefile\`.\`file\`,
        \`templatefile\`.\`type\`,
        \`templatefile\`.\`status\`,
        \`templatefile\`.\`note\`,
        \`templatefile\`.\`created_at\`,
        \`templatefile\`.\`updated_at\`,
        \`user\`.\`uuid\` AS \`u_uuid\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`typetemplatefile\`.\`uuid\` AS \`ttf_uuid\`,
        \`typetemplatefile\`.\`name\` AS \`ttf_name\`
      FROM 
        \`templatefile\`
      INNER JOIN \`user\` ON \`templatefile\`.\`user_id\` = \`user\`.\`uuid\`
      INNER JOIN \`typetemplatefile\` ON \`templatefile\`.\`typetemplatefile_id\` = \`typetemplatefile\`.\`uuid\`
      WHERE 
        (((\`templatefile\`.\`user_id\` = '${user_id}' AND \`templatefile\`.\`type\` = 0) ||
        \`templatefile\`.\`type\` = 1) AND
        (\`templatefile\`.\`name\` LIKE '%${keyword}%' OR 
        \`templatefile\`.\`note\` LIKE '%${keyword}%')) AND
        \`templatefile\`.\`is_removed\` = ${isRecycleBin}
      ORDER BY \`templatefile\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total
      FROM \`templatefile\`
      WHERE
        ((\`user_id\` = '${user_id}' AND \`type\` = 0) ||
        \`type\` = 1) AND
        \`is_removed\` = ${isRecycleBin}`,
    ]);
    const totalCount = result[1][0].total;
    const data =
      result[0] == null
        ? null
        : result[0].map((item) => {
            return {
              uuid: item.uuid,
              name: item.name,
              file: item.file,
              type: item.type,
              status: item.status,
              note: item.note,
              created_at: item.created_at,
              updated_at: item.updated_at,
              user: {
                uuid: item.u_uuid,
                name: item.u_name,
              },
              type_template_file: {
                uuid: item.ttf_uuid,
                name: item.ttf_name,
              },
            };
          });

    return {
      code: 200,
      data: data,
      pagination: {
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function getDetailTemplateFile({ uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT 
        \`templatefile\`.\`uuid\`,
        \`templatefile\`.\`name\`,
        \`templatefile\`.\`file\`,
        \`templatefile\`.\`type\`,
        \`templatefile\`.\`status\`,
        \`templatefile\`.\`note\`,
        \`templatefile\`.\`created_at\`,
        \`templatefile\`.\`updated_at\`,
        \`user\`.\`uuid\` AS \`u_uuid\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`typetemplatefile\`.\`uuid\` AS \`ttf_uuid\`,
        \`typetemplatefile\`.\`name\` AS \`ttf_name\`
      FROM 
        \`templatefile\`
      INNER JOIN \`user\` ON \`templatefile\`.\`user_id\` = \`user\`.\`uuid\`
      INNER JOIN \`typetemplatefile\` ON \`templatefile\`.\`typetemplatefile_id\` = \`typetemplatefile\`.\`uuid\`
      WHERE 
        \`templatefile\`.\`uuid\` = '${uuid}' 
    `);
    const data =
      result == null
        ? null
        : {
            uuid: result.uuid,
            name: result.name,
            file: result.file,
            type: result.type,
            status: result.status,
            note: result.note,
            created_at: result.created_at,
            updated_at: result.updated_at,
            user: {
              uuid: result.u_uuid,
              name: result.u_name,
            },
            type_template_file: {
              uuid: result.ttf_uuid,
              name: result.ttf_name,
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
      message: "Đã thêm file mẫu thành công!",
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

    let file;
    await db
      .execute(`SELECT \`file\` FROM \`templatefile\` WHERE \`uuid\` = '${uuid}'`)
      .then((result) => {
        file = result[0].file;
      });

    await db.execute(`
      UPDATE
        \`templatefile\`
      SET
        \`user_id\` = '${user_id}',
        \`typetemplatefile_id\` = '${body.typetemplatefile_id}',
        \`name\` = '${body.name}',
        \`file\` = '${body.file}',
        \`type\` = '${body.type}',
        \`status\` = ${body.status},
        \`note\` = '${body.note == null ? "" : body.note}'
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (file != null && file !== body.file) {
      deleteFile(file);
    }

    return {
      code: 200,
      message: "Đã chỉnh sửa thông tin file mẫu thành công!",
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
      message: "Đã chỉnh sửa thông tin file mẫu thành công!",
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
      message: "Đã xóa file mẫu thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTemplateFile,
  getDetailTemplateFile,
  createTemplateFile,
  updateTemplateFile,
  changeStatusTemplateFile,
  deleteTemplateFile,
};
