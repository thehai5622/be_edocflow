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

module.exports = { sendPushNotification };
