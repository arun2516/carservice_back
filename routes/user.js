const express = require("express");
const router = express.Router();
const reg = require("../module/user");

router.post("/signin", reg.signin)
router.get("/data", reg.userdata)
router.post('/adminsignup',reg.adminsignup);
router.post("/adminsignin",reg.adminsignin);

module.exports = router;