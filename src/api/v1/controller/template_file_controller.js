const db = require("../../utils/database");

async function getListTemplateFile(id) {
  try {
    const data = await db.execute(
      `SELECT * FROM \`templatefile\``
    );

    return {
      code: 200,
      data: data ?? null,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListTemplateFile,
};
