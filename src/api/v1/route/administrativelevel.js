const express = require("express");
const router = express.Router();
const controller = require("../controller/administrativelevel_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getAdministrativeLevel({
      keyword: req.query.keyword,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
