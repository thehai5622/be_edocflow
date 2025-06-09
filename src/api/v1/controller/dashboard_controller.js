const db = require("../../utils/database");

async function getDashboard({ user_id, filterType = "all" }) {
  try {
    let issuingauthority_id;
    await db
      .execute(
        `SELECT \`issuingauthority_id\` FROM \`user\` WHERE \`uuid\` = '${user_id}'`
      )
      .then((result) => {
        issuingauthority_id = result[0].issuingauthority_id;
      });

    const documentOut = await db.queryMultiple([
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}'`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 1`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 2`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 3`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 4`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 5`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 0`,
    ]);

    const documentIn = await db.queryMultiple([
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}'`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 1`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 2`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 3`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 4`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 5`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 0`,
    ]);

    return {
      code: 200,
      data: {
        document_out: {
          total: documentOut[0][0].total ?? null,
          unprocessed: documentOut[1][0].total ?? null,
          pending_approval: documentOut[2][0].total ?? null,
          pending_release: documentOut[3][0].total ?? null,
          active: documentOut[4][0].total ?? null,
          overdue: documentOut[5][0].total ?? null,
          canceled: documentOut[6][0].total ?? null,
        },
        document_in: {
          total: documentIn[0][0].total ?? null,
          unprocessed: documentIn[1][0].total ?? null,
          pending_approval: documentIn[2][0].total ?? null,
          pending_release: documentIn[3][0].total ?? null,
          active: documentIn[4][0].total ?? null,
          overdue: documentIn[5][0].total ?? null,
          canceled: documentIn[6][0].total ?? null,
        },
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { getDashboard };
