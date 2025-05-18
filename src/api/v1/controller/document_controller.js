const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListDocument({
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
        \`document\`
      WHERE
        (\`name\` LIKE '%${keyword}%') AND
        \`is_removed\` = ${isRecycleBin}
      ORDER BY \`document\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`name\` LIKE '%${keyword}%' AND is_removed = ${isRecycleBin}`,
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

module.exports = {
  getListDocument,
};
