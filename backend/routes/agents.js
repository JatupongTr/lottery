const express = require("express");
const router = express.Router();

const agentController = require('../controllers/agent')
const checkAuth = require('../middleware/check-auth')


router.post("", checkAuth, agentController.createAgent);
router.get("", checkAuth, agentController.findAgent);
router.get("/new", checkAuth, agentController.findNewAgent);
router.get("/:id", checkAuth, agentController.findAgentById);
router.put("/:id", checkAuth, agentController.updateAgent);
router.delete("/:id", checkAuth, agentController.removeAgent);

module.exports = router;
