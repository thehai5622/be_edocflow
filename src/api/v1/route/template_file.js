const express = require("express");
const router = express.Router();
const controller = require("../controller/template_file_controller");
const { checkLogin } = require("../../middleware/check_login");

router.get("/", checkLogin, async (req, res, next) => {
  try {
    res.json(await controller.getListTemplateFile());
  } catch (error) {
    next(error);
  }
});

// Thêm file template

// Chỉnh sửa file template

// Mở/Khóa file template

// Xóa file template

module.exports = router;
