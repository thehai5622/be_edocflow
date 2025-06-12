const db = require("../../utils/database");
const dayjs = require("dayjs");

async function getDashboard({ user_id, filterType = "all" }) {
  try {
    let issuingauthority_id;
    const userResult = await db.execute(
      `SELECT \`issuingauthority_id\` FROM \`user\` WHERE \`uuid\` = '${user_id}'`
    );
    issuingauthority_id = userResult[0].issuingauthority_id;

    let dateFilter = "";
    const now = dayjs();
    let startDate, endDate;

    switch (filterType) {
      case "this_month":
        startDate = now.startOf("month").format("YYYY-MM-DD");
        endDate = now.endOf("month").format("YYYY-MM-DD");
        break;
      case "last_month":
        startDate = now.subtract(1, "month").startOf("month").format("YYYY-MM-DD");
        endDate = now.subtract(1, "month").endOf("month").format("YYYY-MM-DD");
        break;
      case "this_year":
        startDate = now.startOf("year").format("YYYY-MM-DD");
        endDate = now.endOf("year").format("YYYY-MM-DD");
        break;
      case "last_year":
        startDate = now.subtract(1, "year").startOf("year").format("YYYY-MM-DD");
        endDate = now.subtract(1, "year").endOf("year").format("YYYY-MM-DD");
        break;
    }

    if (startDate && endDate) {
      dateFilter = `AND \`created_at\` BETWEEN '${startDate}' AND '${endDate}'`;
    }

    // Tạo query documentOut
    const documentOut = await db.queryMultiple([
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 1 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 2 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 3 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 4 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 5 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`from_issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 0 ${dateFilter}`,
    ]);

    // Tạo query documentIn
    const documentIn = await db.queryMultiple([
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 1 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 2 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 3 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 4 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 5 ${dateFilter}`,
      `SELECT count(*) AS total FROM \`document\` WHERE \`issuingauthority_id\` = '${issuingauthority_id}' AND \`status\` = 0 ${dateFilter}`,
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
      },
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { getDashboard };
