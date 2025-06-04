const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");

async function getListNotification({
  user_id = "",
  keyword = "",
  page = 1,
  limit = 12,
  isRecycleBin = 0,
}) {
  try {
    const offset = offsetUtils.getOffset(page, limit);

    let issuingauthority_id;

    await db
      .execute(
        `SELECT \`issuingauthority_id\` FROM \`user\` WHERE \`uuid\` = '${user_id}'`
      )
      .then((result) => {
        issuingauthority_id = result[0].issuingauthority_id;
      });

    const result = await db.queryMultiple([
      `SELECT
        \`document\`.\`uuid\`,
        \`document\`.\`summary\`,
        \`document\`.\`status\`,
        \`document\`.\`created_at\`,
        \`document\`.\`updated_at\`,
        \`user\`.\`uuid\` AS \`u_uuid\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`
      FROM
        \`document\`
      LEFT JOIN \`user\`
        ON \`document\`.\`user_id\` = \`user\`.\`uuid\`
      LEFT JOIN \`issuingauthority\`
        ON \`document\`.\`issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      WHERE
        (\`document\`.\`summary\` LIKE '%${keyword}%'
        OR \`document\`.\`uuid\` LIKE '%${keyword}%' 
        OR \`document\`.\`original_location\` LIKE '%${keyword}%') AND
        \`document\`.\`from_issuingauthority_id\` = '${issuingauthority_id}' AND
        \`document\`.\`is_removed\` = ${isRecycleBin}
      ORDER BY \`document\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`document\` WHERE
        (\`summary\` LIKE '%${keyword}%' 
        OR \`uuid\` LIKE '%${keyword}%' 
        OR \`original_location\` LIKE '%${keyword}%') AND
        \`from_issuingauthority_id\` = '${issuingauthority_id}' AND
        \`is_removed\` = ${isRecycleBin}`,
    ]);
    const totalCount = result[1][0].total;
    const data =
      result[0] == null
        ? null
        : result[0].map((item) => {
            return {
              uuid: item.uuid,
              name: item.name,
              summary: item.summary,
              status: item.status,
              created_at: item.created_at,
              updated_at: item.updated_at,
              user: {
                uuid: item.u_uuid,
                name: item.u_name,
              },
              issuingauthority: {
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

module.exports = {
  getListNotification,
};
