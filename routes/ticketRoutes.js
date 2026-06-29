const express = require("express");

const router = express.Router();
const {
	createTicket,
	getTickets,
	getTicketById,
	updateTicketStatus,
} = require("../controllers/ticketController");
router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id/status", updateTicketStatus);

module.exports = router;
