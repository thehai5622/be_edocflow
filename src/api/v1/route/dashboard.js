const express = require("express");
const router = express.Router();
const controller = require("../controller/dashboard_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(
      await controller.getDashboard({
        user_id: req.payload.id,
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
