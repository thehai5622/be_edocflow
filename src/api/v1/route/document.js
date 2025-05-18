const express = require("express");
const router = express.Router();
const controller = require("../controller/typetemplatefile_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListDocument({
      keyword: req.query.keyword,
      page: req.query.page,
      limit: req.query.limit,
      isRecycleBin: req.query.isRecycleBin,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
