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
        *
      FROM
        \`issuingauthority\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`issuingauthority\`.\`created_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`issuingauthority\` WHERE \`name\` LIKE '%${keyword}%' AND is_removed = ${isRecycleBin}`,
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
      message: "Đã thêm cơ quan ban hành thành công!",
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
  createIssuingAuthority,
  updateIssuingAuthority,
  deleteIssuingAuthority,
};
