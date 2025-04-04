const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require('../controller/file_controller')
const { checkLogin } = require("../../middleware/check_login");

const upload = multer({ dest: "src/resources" });

router.post('/single-upload', checkLogin, upload.single('file'), async (req, res, next) => {
  try {
      res.json(await controller.uploadImage(req.file))
  } catch (error) {
      next(error)
  }
})

router.post('/multiple-upload', checkLogin, upload.array('files', 10), async (req, res, next) => {
  try {
      res.json(await controller.uploadMultipleImages(req.files))
  } catch (error) {
      next(error)
  }
})

module.exports = router;
