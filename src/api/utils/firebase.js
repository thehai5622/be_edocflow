const admin = require("firebase-admin");
const serviceAccount = require("../../config/firebase/edocflow-6d9ef-firebase-adminsdk-fbsvc-16aa2b916e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
