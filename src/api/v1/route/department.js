const express = require("express");
const router = express.Router();
const controller = require("../controller/department_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListDepartment({
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
    res.json(await controller.getListD({
      keyword: req.query.keyword,
      issuing_authority: req.query.issuing_authority
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.createDepartment({
      user_id: req.payload.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.updateDepartment({
      uuid: req.params.id,
      body: req.body
    }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.deleteDepartment({
      uuid: req.params.id,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
