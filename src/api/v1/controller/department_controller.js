const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListDepartment({
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT
          \`department\`.\`uuid\`,
          \`department\`.\`name\`,
          \`department\`.\`created_at\`,
          \`department\`.\`updated_at\`,
          \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
          \`issuingauthority\`.\`name\` AS \`ia_name\`
      FROM
          \`department\`
      LEFT JOIN \`issuingauthority\` ON \`department\`.\`issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      WHERE
        (\`department\`.\`name\` LIKE '%${keyword}%') AND
        \`department\`.\`is_removed\` = ${isRecycleBin}
      ORDER BY \`department\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`department\` WHERE \`name\` LIKE '%${keyword}%' AND is_removed = ${isRecycleBin}`,
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
              issuing_authority: {
                uuid: item.ia_uuid,
                name: item.ia_name,
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

async function getListD({ keyword = "" }) {
  try {
    const result = await db.execute(`
      SELECT
        \`uuid\`,
        \`name\`
      FROM
        \`department\`
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

async function createDepartment({ user_id, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Tên của phòng ban là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.issuingauthority_id == null || body.issuingauthority_id == "") {
      const error = new Error(
        "Thuộc bộ phận của cơ quan ban hành là bắt buộc!"
      );
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      INSERT INTO \`department\`(
        \`uuid\`,
        \`name\`,
        \`issuingauthority_id\`
      )
      VALUES(
        UUID(),
        ?,
        ?
      )
    `,
      [body.name, body.issuingauthority_id]
    );

    return {
      code: 200,
      message: "Đã thêm cơ quan ban hành thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateDepartment({ uuid, body }) {
  try {
    if (body.name == null || body.name == "") {
      const error = new Error("Tên của phòng ban là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.issuingauthority_id == null || body.issuingauthority_id == "") {
      const error = new Error(
        "Thuộc bộ phận của cơ quan ban hành là bắt buộc!"
      );
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      UPDATE
        \`department\`
      SET
        \`name\` = ?,
        \`issuingauthority_id\` = ?
      WHERE
        \`uuid\` = ?
    `,
      [body.name, body.issuingauthority_id, uuid]
    );

    return {
      code: 200,
      message: "Đã chỉnh sửa thông tin phòng ban thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteDepartment({ uuid, user_id, body }) {
  try {
    await db.execute(`
      UPDATE
        \`department\`
      SET
        \`is_removed\` = 1
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Đã xóa phòng ban thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListDepartment,
  getListD,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
