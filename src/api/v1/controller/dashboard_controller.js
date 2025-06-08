const db = require("../../utils/database");

async function getDashboard({ user_id }) {
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
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}'`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 1`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 2`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 3`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 4`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 5`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id \` = '${issuingauthority_id}' AND \`status\` = 0`,
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
          total: documentOut[0].total,
          waiting: documentOut[1].total,
          processing: documentOut[2].total,
          complete: documentOut[3].total,
          canceled: documentOut[4].total,
          rejected: documentOut[5].total,
          recyclebin: documentOut[6].total,
        },
        document_in: {
          total: documentIn[0].total,
          waiting: documentIn[1].total,
          processing: documentIn[2].total,
          complete: documentIn[3].total,
          canceled: documentIn[4].total,
          rejected: documentIn[5].total,
          recyclebin: documentIn[6].total,
        },
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { getDashboard };
