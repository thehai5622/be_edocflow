const express = require("express");
const router = express.Router();
const controller = require("../controller/user_controller");
const { checkLogin } = require("../../middleware/check_login");
const { sendMultiplePushNotification } = require("../../utils/notification");

router.get("/me", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getDetailInfo(req.payload.id));
  } catch (error) {
    next(error);
  }
});

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(
      await controller.getListUser({
        keyword: req.query.keyword,
        page: req.query.page,
        limit: req.query.limit,
        isRecycleBin: req.query.isRecycleBin,
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get("/detail/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getDetailInfo(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post("/create", checkLogin, async (req, res, next) => {
  try {
    res.json(
      await controller.createUser({
        user_id: req.payload.id,
        body: req.body,
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.json(await controller.login(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    res.json(await controller.refreshToken(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/send-notification", checkLogin, async (req, res, next) => {
  try {
    await sendMultiplePushNotification(
      ["fSkO1iNRRoim0gse5xiPiS:APA91bGIKust6WRsG6nBemLlYSia2KbZkD5gP-UPnelZRf3dXQqc6jH6YqxgsV0zV52Qc0-UHOx7_DLJTJltdGEWWfN_2pHZtzm7Yl-E_WBux0JIxmmHZuQ"],
      "Xin chào",
      "Bạn nhận được thông báo từ server!"
    );
    res.status(200).json({ message: "Thông báo đã được gửi!" });
  } catch (error) {
    next(error);
  }
});

router.put("/me", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateProfile(req.payload.id, req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/change-password", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.changePassword(req.payload.id, req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/update-user/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateUser(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/provide-account/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.provideAccount(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/reset-password/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.resetPassword(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/lock/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.changeStatus(req.payload.id, req.params.id, 0));
  } catch (error) {
    next(error);
  }
});

router.put("/unlock/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.changeStatus(req.payload.id, req.params.id, 1));
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.logout(req.payload.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
