const admin = require("./firebase");

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
    console.log("Không có token để gửi.");
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
    data,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    // console.log(`✅ Đã gửi tới ${tokens.length} thiết bị.`);
    // console.log(`📬 Thành công: ${response.successCount}`);
    // console.log(`❌ Thất bại: ${response.failureCount}`);

    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.error(
            `Lỗi gửi tới token[${idx}]: ${tokens[idx]}`,
            resp.error
          );
        }
      });
    }
  } catch (error) {
    console.error("Gửi thông báo lỗi:", error);
  }
}

module.exports = { sendPushNotification, sendMultiplePushNotification };
