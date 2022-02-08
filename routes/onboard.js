const express = require("express");
const router = express.Router();
const data = require("../module/onboard");

router.post("/enquiry", data.onboard)

module.exports = router;