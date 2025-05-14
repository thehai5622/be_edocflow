const express = require("express");
const router = express.Router();
const controller = require("../controller/template_file_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListTemplateFile({
      user_id: req.payload.id,
      keyword: req.query.keyword,
      page: req.query.page,
      limit: req.query.limit,
      isRecycleBin: req.query.isRecycleBin,
    }));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getDetailTemplateFile({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.createTemplateFile({
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateTemplateFile({
      uuid: req.params.id,
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.put("/change-status/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.changeStatusTemplateFile({
      uuid: req.params.id,
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.deleteTemplateFile({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
