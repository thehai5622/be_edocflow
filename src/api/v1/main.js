const express = require("express");
const router = express.Router();

router.use("/file", require("./route/file"));
router.use("/user", require("./route/user"));
router.use("/typetemplatefile", require("./route/typetemplatefile"));
router.use("/template-file", require("./route/template_file"));
router.use("/field", require("./route/field"));

module.exports = router;
