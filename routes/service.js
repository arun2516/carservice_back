const express = require("express");
const router = express.Router();
const data = require("../module/service");

router.post("/service", data.service)

module.exports = router;