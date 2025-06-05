const db = require("../../utils/database");
const offsetUtils = require("../../utils/offset");
const { sendMultiplePushNotification } = require("../../utils/notification");

async function getListDocumentOut({
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

async function getListDocumentIn({
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
        \`issuingauthority\`.\`uuid\` AS \`fia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`fia_name\`
      FROM
        \`document\`
      LEFT JOIN \`user\`
        ON \`document\`.\`user_id\` = \`user\`.\`uuid\`
      LEFT JOIN \`issuingauthority\`
        ON \`document\`.\`from_issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      WHERE
        (\`document\`.\`summary\` LIKE '%${keyword}%'
        OR \`document\`.\`uuid\` LIKE '%${keyword}%' 
        OR \`document\`.\`original_location\` LIKE '%${keyword}%') AND
        \`document\`.\`issuingauthority_id\` = '${issuingauthority_id}' AND
        \`document\`.\`is_removed\` = ${isRecycleBin}
      ORDER BY \`document\`.\`updated_at\` DESC
        LIMIT ${offset}, ${limit}`,
      `SELECT count(*) AS total FROM \`document\` WHERE
        (\`summary\` LIKE '%${keyword}%' 
        OR \`uuid\` LIKE '%${keyword}%' 
        OR \`original_location\` LIKE '%${keyword}%') AND
        \`issuingauthority_id\` = '${issuingauthority_id}' AND
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
              from_issuingauthority: {
                uuid: item.fia_uuid,
                name: item.fia_name,
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

async function getDetailDocument({ uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`document\`.\`uuid\`,
        \`document\`.\`summary\`,
        \`document\`.\`release\`,
        \`document\`.\`original_location\`,
        \`document\`.\`number_releases\`,
        \`document\`.\`status\`,
        \`document\`.\`urgency_level\`,
        \`document\`.\`confidentiality_level\`,
        \`document\`.\`created_at\`,
        \`document\`.\`updated_at\`,
        \`user\`.\`uuid\` AS \`u_uuid\`,
        \`user\`.\`name\` AS \`u_name\`,
        \`usersign\`.\`uuid\` AS \`us_uuid\`,
        \`usersign\`.\`name\` AS \`us_name\`,
        \`from_issuingauthority\`.\`uuid\` AS \`fia_uuid\`,
        \`from_issuingauthority\`.\`name\` AS \`fia_name\`,
        \`issuingauthority\`.\`uuid\` AS \`ia_uuid\`,
        \`issuingauthority\`.\`name\` AS \`ia_name\`,
        \`field\`.\`uuid\` AS \`f_uuid\`,
        \`field\`.\`name\` AS \`f_name\`,
        \`templatefile\`.\`uuid\` AS \`tf_uuid\`,
        \`templatefile\`.\`name\` AS \`tf_name\`
      FROM
        \`document\`
      LEFT JOIN \`user\`
        ON \`document\`.\`user_id\` = \`user\`.\`uuid\`
      LEFT JOIN \`user\` AS \`usersign\`
        ON \`document\`.\`usersign_id\` = \`usersign\`.\`uuid\`
      LEFT JOIN \`issuingauthority\` AS \`from_issuingauthority\`
        ON \`document\`.\`from_issuingauthority_id\` = \`from_issuingauthority\`.\`uuid\`
      LEFT JOIN \`issuingauthority\`
        ON \`document\`.\`issuingauthority_id\` = \`issuingauthority\`.\`uuid\`
      LEFT JOIN \`field\`
        ON \`document\`.\`field_id\` = \`field\`.\`uuid\`
      LEFT JOIN \`templatefile\`
        ON \`document\`.\`templatefile_id\` = \`templatefile\`.\`uuid\`
      WHERE
        \`document\`.\`uuid\` = '${uuid}'
    `);
    const data =
      result == null
        ? null
        : {
            uuid: result.uuid,
            name: result.name,
            summary: result.summary,
            release: result.release,
            original_location: result.original_location,
            number_releases: result.number_releases,
            status: result.status,
            urgency_level: result.urgency_level,
            confidentiality_level: result.confidentiality_level,
            created_at: result.created_at,
            updated_at: result.updated_at,
            user: {
              uuid: result.u_uuid,
              name: result.u_name,
            },
            usersign: {
              uuid: result.us_uuid,
              name: result.us_name,
            },
            from_issuingauthority: {
              uuid: result.fia_uuid,
              name: result.fia_name,
            },
            issuingauthority: {
              uuid: result.ia_uuid,
              name: result.ia_name,
            },
            field: {
              uuid: result.f_uuid,
              name: result.f_name,
            },
            templatefile: {
              uuid: result.tf_uuid,
              name: result.tf_name,
            },
          };

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}

async function createDocument({ user_id, body }) {
  try {
    if (
      body.from_issuingauthority_id == null ||
      body.from_issuingauthority_id == ""
    ) {
      const error = new Error("Cơ quan ban hành gửi văn bản đi là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.issuing_authority == null || body.issuing_authority == "") {
      const error = new Error("Cơ quan ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.field == null || body.field == "") {
      const error = new Error("Lĩnh vực là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.template_file == null || body.template_file == "") {
      const error = new Error("File mẫu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.summary == null || body.summary == "") {
      const error = new Error("Trích yếu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.release == null) {
      const error = new Error("Ngày ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.original_location == null || body.original_location == "") {
      const error = new Error("Nơi lưu trữ bản gốc là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.number_releases == null || body.number_releases == "") {
      const error = new Error("Số bản lưu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.urgency_level == null) {
      const error = new Error("Mức độ khẩn là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.confidentiality_level == null) {
      const error = new Error("Mức độ bảo mật là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      INSERT INTO \`document\`(
        \`uuid\`,
        \`user_id\`,
        \`from_issuingauthority_id\`,
        \`issuingauthority_id\`,
        \`usersign_id\`,
        \`field_id\`,
        \`templatefile_id\`,
        \`summary\`,
        \`release\`,
        \`original_location\`,
        \`number_releases\`,
        \`status\`,
        \`urgency_level\`,
        \`confidentiality_level\`
      )
      VALUES(
        UUID(),
        '${user_id}',
        '${body.from_issuingauthority_id}',
        '${body.issuing_authority}',
        NULL,
        '${body.field}',
        '${body.template_file}',
        '${body.summary}',
        '${body.release}',
        '${body.original_location}',
        ${body.number_releases},
        1,
        ${body.urgency_level},
        ${body.confidentiality_level}
      )
    `);

    const listToken = await db.execute(`
      SELECT
        \`t\`.\`fcm_token\`,
        \`u\`.\`uuid\` AS \`u_uuid\`
      FROM \`token\` AS \`t\`
      JOIN \`user\` AS \`u\` ON \`t\`.\`user_id\` = \`u\`.\`uuid\`
      WHERE
        \`u\`.\`issuingauthority_id\` = '${body.issuing_authority}'
    `);

    await sendMultiplePushNotification(
      listToken
        .map((t) => {
          return t.fcm_token;
        })
        .filter((item) => item !== null),
      "Văn bản đến",
      "Bạn nhận được văn bản đến mới!"
    );
    
    db.execute(
      `
      INSERT INTO \`notification\`(
        \`uuid\`,
        \`user_id\`,
        \`title\`,
        \`body\`,
        \`data\`
      )
      VALUES ${listToken
        .map((t) => {
          return `(
            UUID(),
            '${t.u_uuid}',
            'Văn bản đến',
            'Văn bản đến mới!',
            '${JSON.stringify({
              type: "document",
              uuid: "",
              more: "in"
            })}'
          )`;
        })
        .join(",")}`
    );

    return {
      code: 200,
      message: "Đã thêm văn bản đi thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function updateDocument({ user_id, body, uuid }) {
  try {
    if (body.field == null || body.field == "") {
      const error = new Error("Lĩnh vực là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.template_file == null || body.template_file == "") {
      const error = new Error("File mẫu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.summary == null || body.summary == "") {
      const error = new Error("Trích yếu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.release == null) {
      const error = new Error("Ngày ban hành là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.original_location == null || body.original_location == "") {
      const error = new Error("Nơi lưu trữ bản gốc là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.number_releases == null || body.number_releases == "") {
      const error = new Error("Số bản lưu là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.urgency_level == null) {
      const error = new Error("Mức độ khẩn là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }
    if (body.confidentiality_level == null) {
      const error = new Error("Mức độ bảo mật là bắt buộc!");
      error.statusCode = 400;
      throw error;
    }

    const [result] = await db.execute(`
      SELECT
        \`status\`
      FROM
        \`document\`
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (result.status !== 1) {
      const error = new Error("Văn bản này không thể cập nhật!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`
      UPDATE
        \`document\`
      SET
        \`field_id\` = '${body.field}',
        \`templatefile_id\` = '${body.template_file}',
        \`summary\` = '${body.summary}',
        \`release\` = '${body.release}',
        \`original_location\` = '${body.original_location}',
        \`number_releases\` = ${body.number_releases},
        \`urgency_level\` = ${body.urgency_level},
        \`confidentiality_level\` = ${body.confidentiality_level}
      WHERE
        \`uuid\` = '${uuid}'
    `);

    return {
      code: 200,
      message: "Đã chỉnh sửa văn bản đi thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function receptionDocument({ user_id, uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`status\`,
        \`from_issuingauthority_id\`
      FROM
        \`document\`
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (result.status !== 1) {
      const error = new Error("Văn bản này không thể cập nhật!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      UPDATE
        \`document\`
      SET
        \`status\` = 2
      WHERE
        \`uuid\` = ?
    `,
      [uuid]
    );

    const listToken = await db.execute(`
      SELECT
        \`t\`.\`fcm_token\`,
        \`u\`.\`uuid\` AS \`u_uuid\`
      FROM \`token\` AS \`t\`
      JOIN \`user\` AS \`u\` ON \`t\`.\`user_id\` = \`u\`.\`uuid\`
      WHERE
        \`u\`.\`issuingauthority_id\` = '${result.from_issuingauthority_id}'
    `);

    await sendMultiplePushNotification(
      listToken
        .map((t) => {
          return t.fcm_token;
        })
        .filter((item) => item !== null),
      "Văn bản đi",
      "Một văn bản đi đã được tiếp nhập!",
      {
        document: JSON.stringify({
          uuid: uuid,
          message: "Văn bản đã tiếp nhận!",
        }),
      }
    );

    db.execute(
      `
      INSERT INTO \`notification\`(
        \`uuid\`,
        \`user_id\`,
        \`title\`,
        \`body\`,
        \`data\`
      )
      VALUES ${listToken
        .map((t) => {
          return `(
            UUID(),
            '${t.u_uuid}',
            'Văn bản đi',
            'Văn bản ${uuid} đã được tiếp nhận!',
            '${JSON.stringify({
              type: "document",
              uuid: uuid,
              more: "out"
            })}'
          )`;
        })
        .join(",")}`
    );

    return {
      code: 200,
      message: "Đã tiếp nhận văn bản đến thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function signDocument({ user_id, uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`status\`,
        \`from_issuingauthority_id\`
      FROM
        \`document\`
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (result.status !== 2) {
      const error = new Error("Văn bản này không thể cập nhật!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      UPDATE
        \`document\`
      SET
        \`usersign_id\` = ?,
        \`status\` = 3
      WHERE
        \`uuid\` = ?
    `,
      [user_id, uuid]
    );

    const listToken = await db.execute(`
      SELECT
        \`t\`.\`fcm_token\`,
        \`u\`.\`uuid\` AS \`u_uuid\`
      FROM \`token\` AS \`t\`
      JOIN \`user\` AS \`u\` ON \`t\`.\`user_id\` = \`u\`.\`uuid\`
      WHERE
        \`u\`.\`issuingauthority_id\` = '${result.from_issuingauthority_id}'
    `);

    await sendMultiplePushNotification(
      listToken
        .map((t) => {
          return t.fcm_token;
        })
        .filter((item) => item !== null),
      "Văn bản đi",
      "Một văn bản đi đã được ký duyệt!",
      {
        document: JSON.stringify({
          uuid: uuid,
          message: "Văn bản đã được ký duyệt!",
        }),
      }
    );

    db.execute(
      `
      INSERT INTO \`notification\`(
        \`uuid\`,
        \`user_id\`,
        \`title\`,
        \`body\`,
        \`data\`
      )
      VALUES ${listToken
        .map((t) => {
          return `(
            UUID(),
            '${t.u_uuid}',
            'Văn bản đi',
            'Văn bản ${uuid} đã được ký duyệt!',
            '${JSON.stringify({
              type: "document",
              uuid: uuid,
              more: "out"
            })}'
          )`;
        })
        .join(",")}`
    );

    return {
      code: 200,
      message: "Đã ký thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function deleteDocument({ user_id, uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`status\`
      FROM
        \`document\`
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (result.status !== 1) {
      const error = new Error("Văn bản này không thể được thu hồi!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(`DELETE FROM \`document\`
      WHERE \`uuid\` = '${uuid}'`);

    return {
      code: 200,
      message: "Đã thu hồi văn bản thành công!",
    };
  } catch (error) {
    throw error;
  }
}

async function cancelDocument({ user_id, uuid }) {
  try {
    const [result] = await db.execute(`
      SELECT
        \`status\`,
        \`from_issuingauthority_id\`
      FROM
        \`document\`
      WHERE
        \`uuid\` = '${uuid}'
    `);

    if (result.status !== 1) {
      const error = new Error("Văn bản này không thể hủy!");
      error.statusCode = 400;
      throw error;
    }

    await db.execute(
      `
      UPDATE
        \`document\`
      SET
        \`status\` = 0
      WHERE
        \`uuid\` = ?
    `,
      [uuid]
    );

    const listToken = await db.execute(`
      SELECT
        \`t\`.\`fcm_token\`,
        \`u\`.\`uuid\` AS \`u_uuid\`
      FROM \`token\` AS \`t\`
      JOIN \`user\` AS \`u\` ON \`t\`.\`user_id\` = \`u\`.\`uuid\`
      WHERE
        \`u\`.\`issuingauthority_id\` = '${result.from_issuingauthority_id}'
    `);

    await sendMultiplePushNotification(
      listToken
        .map((t) => {
          return t.fcm_token;
        })
        .filter((item) => item !== null),
      "Văn bản đi",
      "Một văn bản đi đã bị hủy bỏ!",
      {
        document: JSON.stringify({
          uuid: uuid,
          message: "Văn bản đã bị hủy bỏ!",
        }),
      }
    );

    db.execute(
      `
      INSERT INTO \`notification\`(
        \`uuid\`,
        \`user_id\`,
        \`title\`,
        \`body\`,
        \`data\`
      )
      VALUES ${listToken
        .map((t) => {
          return `(
            UUID(),
            '${t.u_uuid}',
            'Văn bản đi',
            'Văn bản ${uuid} đã bị hủy bỏ!',
            '${JSON.stringify({
              type: "document",
              uuid: uuid,
              more: "out"
            })}'
          )`;
        })
        .join(",")}`
    );

    return {
      code: 200,
      message: "Đã hủy văn bản thành công!",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListDocumentOut,
  getListDocumentIn,
  getDetailDocument,
  receptionDocument,
  signDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  cancelDocument,
};
