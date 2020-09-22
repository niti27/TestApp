
const express = require("express");
const router = express.Router();
const LogController = require("../controllers/log");
router.get("", LogController.getLogs);
router.post("", LogController.createLog);
router.post("/search", LogController.searchLogs);


module.exports = router;
