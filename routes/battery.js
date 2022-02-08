const express = require("express");
const router = express.Router();
const data = require("../module/battery");

router.post("/enquiry", data.battery)

module.exports = router;