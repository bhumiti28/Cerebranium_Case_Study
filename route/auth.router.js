const express = require("express");
const router = express.Router();
const adminAuth = require("../controller/auth.controller");

router.post("/signin", adminAuth.signin);
router.post('/changepassword', adminAuth.changeAdminPassword)

module.exports = router;
