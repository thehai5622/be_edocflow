const express = require("express");
const router = express.Router();
const controller = require("../controller/typetemplatefile_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListTypeTemplateFile({
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

router.get("/dropdown", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListTTF({
      keyword: req.query.keyword,
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.createTypeTemplateFile({
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateTypeTemplateFile({
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
    res.json(await controller.deleteTypeTemplateFile({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
