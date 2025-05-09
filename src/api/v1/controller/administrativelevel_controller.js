const db = require("../../utils/database");

async function getAdministrativeLevel({ keyword = "" }) {
  try {
    const result = await db.execute(
      `SELECT
        *
      FROM
        \`administrativelevel\`
      WHERE
        \`name\` LIKE '%${keyword}%'
      ORDER BY \`administrativelevel\`.\`created_at\` DESC`
    );

    return {
      code: 200,
      data: result ?? null,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAdministrativeLevel,
};
