const express = require("express");
const router = express.Router();
const controller = require("../controller/user_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/me", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getDetailInfo(req.payload.id));
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

module.exports = router;
