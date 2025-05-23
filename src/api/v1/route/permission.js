const express = require("express");
const router = express.Router();
const controller = require("../controller/permission_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/dropdown", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListP({
      user_id: req.payload.id,
      keyword: req.query.keyword,
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
