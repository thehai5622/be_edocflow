const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListNotification({ user_id = "", page = 1, limit = 12 }) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    const result = await db.queryMultiple([
      `SELECT
        \`uuid\`,
        \`title\`,
        \`body\`,
        \`data\`,
        \`created_at\`,
        \`is_read\`
      FROM
        \`notification\`
      WHERE
        \`user_id\` = '${user_id}'
      ORDER BY \`notification\`.\`created_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`notification\` WHERE \`user_id\` = '${user_id}'`,
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

async function readNotification({ uuid }) {
  try {
    await db.execute(`
        UPDATE
          \`notification\`
        SET
          \`is_read\` = 1
        WHERE
          \`uuid\` = '${uuid}'
      `);

    return {
      code: 200,
      message: "Đã đọc thông báo!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListNotification,
  readNotification,
};
