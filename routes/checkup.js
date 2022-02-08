const express = require("express");
const router = express.Router();
const data = require("../module/checkup");

router.post("/enquiry", data.checkup)

module.exports = router;