import { Router } from "express";

const router = Router();

import {
	createTicket,
	getTicketById,
	getTickets,
	updateTicketStatus,
} from "../controllers/ticketController.js";

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id/status", updateTicketStatus);

export default router;
