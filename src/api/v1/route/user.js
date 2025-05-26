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

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListUser({
      keyword: req.query.keyword,
      page: req.query.page,
      limit: req.query.limit,
      isRecycleBin: req.query.isRecycleBin,
    }));
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
    res.json(await controller.createUser({
      user_id: req.payload.id,
      body: req.body
    }));
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

router.put("/change-status", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.changeStatus(req.payload.id, req.body));
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
