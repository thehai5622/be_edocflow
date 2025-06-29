const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getIssuingAuthority({
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT
          \`issuingauthority\`.\`uuid\`,
          \`issuingauthority\`.\`name\`,
          \`issuingauthority\`.\`created_at\`,
          \`issuingauthority\`.\`updated_at\`,
          \`administrativelevel\`.\`uuid\` AS \`a_uuid\`,
          \`administrativelevel\`.\`name\` AS \`a_name\`
      FROM
          \`issuingauthority\`
      LEFT JOIN \`administrativelevel\` ON \`issuingauthority\`.\`administrativelevel_id\` = \`administrativelevel\`.\`uuid\`
      WHERE
        (\`issuingauthority\`.\`name\` LIKE '%${keyword}%') AND
        \`issuingauthority\`.\`is_removed\` = ${isRecycleBin}
      ORDER BY \`issuingauthority\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`issuingauthority\` WHERE \`name\` LIKE '%${keyword}%' AND is_removed = ${isRecycleBin}`,
    ]);
    const totalCount = result[1][0].total;
    const data =
      result[0] == null
        ? null
        : result[0].map((item) => {
            return {
              uuid: item.uuid,
              name: item.name,
              created_at: item.created_at,
              updated_at: item.updated_at,
              administrative_level: {
                uuid: item.a_uuid,
                name: item.a_name,
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

async function getListIA({ keyword = "" }) {
  try {
    const result = await db.execute(`
      SELECT
        \`uuid\`,
        \`name\`
      FROM
        \`issuingauthority\`
      WHERE
        \`name\` LIKE '%${keyword}%' AND \`is_removed\` = 0
    `);

    return {
      code: 200,
      data: result ?? null,
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
    if (
      body.administrativelevel_id == null ||
      body.administrativelevel_id == ""
    ) {
      const error = new Error("Cấp cơ quan là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      INSERT INTO \`issuingauthority\`(
        \`uuid\`,
        \`name\`,
        \`administrativelevel_id\`
      )
      VALUES(
        UUID(),
        ?,
        ?
      )
    `,
      [body.name, body.administrativelevel_id]
    );

    return {
      code: 200,
      message: "Đã thêm cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateIssuingAuthority({ uuid, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Vui lòng nhập tên!");
      error.statusCode = 400;
      throw error;
    }
    if (
      body.administrativelevel_id == null ||
      body.administrativelevel_id == ""
    ) {
      const error = new Error("Cấp cơ quan là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`issuingauthority\`
      SET
        \`name\` = '${body.name}',
        \`administrativelevel_id\` = ${body.administrativelevel_id}
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Đã chỉnh sửa thông tin cơ quan ban hành thành công!",
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
      message: "Đã xóa cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getIssuingAuthority,
  getListIA,
  createIssuingAuthority,
  updateIssuingAuthority,
  deleteIssuingAuthority,
};
