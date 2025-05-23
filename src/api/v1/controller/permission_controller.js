const db = require("../../utils/database");

async function getListP({ user_id, keyword = "" }) {
  try {
    const result = await db.execute(`
      SELECT
        \`uuid\`, \`name\`
      FROM
        \`permission\`
      WHERE
        \`name\` LIKE '%${keyword}%'
    `);

    return {
      code: 200,
      data: result ?? null,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { getListP };
