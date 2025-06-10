const admin = require("./firebase");
const { writeFileSync } = require("fs");

const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        channelId: "high_importance_channel",
      },
    },
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    throw error;
  }
};

async function sendMultiplePushNotification(tokens, title, body, data) {
  if (tokens.length === 0) {
    return;
  }
  if (tokens.length > 500) {
    const chunks = [];
    for (let i = 0; i < tokens.length; i += 500) {
      chunks.push(tokens.slice(i, i + 500));
    }
    for (let i = 0; i < chunks.length; i++) {
      await sendMultiplePushNotification(chunks[i], title, body, data);
    }
    return;
  }

  const message = {
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        channelId: "high_importance_channel",
      },
    },
    tokens: tokens,
    data: { data },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    let failureText = "";
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failureText += `Lỗi gửi tới token[${idx}]: ${resp.error}\n`;
        }
      });
    }

    writeFileSync(
      "./src/api/log/log.txt",
      `============================================================================
          ${Date()}
          message: \n✅ Đã gửi tới ${tokens.length} thiết bị.\n📬 Thành công: ${
        response.successCount
      }\n❌ Thất bại: ${response.failureCount}\n
          ${failureText}\n`,
      { flag: "a" }
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { sendPushNotification, sendMultiplePushNotification };
