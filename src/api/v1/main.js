const express = require("express");
const router = express.Router();

router.use("/file", require("./route/file"));
router.use("/user", require("./route/user"));
router.use("/template-file", require("./route/template_file"));

module.exports = router;
