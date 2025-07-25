const express = require("express");
const router = express.Router();
const controller = require("../controller/document_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/out", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListDocumentOut({
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

router.get("/in", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListDocumentIn({
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
    res.json(await controller.getDetailDocument({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.createDocument({
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/reception-document/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.receptionDocument({
      uuid: req.params.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/sign-document/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.signDocument({
      user_id: req.payload.id,
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateDocument({
      user_id: req.payload.id,
      uuid: req.params.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.deleteDocument({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

router.delete("/cancel/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.cancelDocument({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
