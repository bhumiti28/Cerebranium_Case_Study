const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.router"));
router.use("/professor", require("./professor.router"));
router.use("/subject", require("./subject.router"));

module.exports = router;
