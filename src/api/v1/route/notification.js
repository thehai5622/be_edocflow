const express = require("express");
const router = express.Router();
const controller = require("../controller/notification_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListNotification({
      user_id: req.payload.id,
      page: req.query.page,
      limit: req.query.limit,
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/read/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.readNotification({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
