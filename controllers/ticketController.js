const db = require("../config/db");

const createTicket = async (req, res) => {
	try {
		const { name, email, subject, description, priority } = req.body;

		if (!name || !email || !subject || !description || !priority) {
			return res.status(400).json({
				message: "All fields are required",
			});
		}
		const sql = `INSERT INTO tickets (name, email, subject, description, priority) VALUES (?, ?, ?, ?, ?)`;
		const [result] = await db.execute(sql, [
			name,
			email,
			subject,
			description,
			priority,
		]);
		res.status(201).json({
			message: "Ticket created successfully",
			ticketId: result.insertId,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({ message: "Server error" });
	}
};

const getTickets = async (req, res) => {
	try {
		const { status, priority } = req.query;
		let sql = "SELECT * FROM tickets";
		const values = [];
		const conditions = [];

		if (status) {
			conditions.push("status= ?");
			values.push(status);
		}
		if (priority) {
			conditions.push("priority= ?");
			values.push(priority);
		}
		if (conditions.length > 0) {
			sql += ` WHERE ${conditions.join(" AND ")}`;
		}
		sql += " ORDER BY created_at DESC";
		const [tickets] = await db.execute(sql, values);
		res.status(200).json(tickets);
	} catch (error) {
		console.error(error);

		res.status(500).json({ message: "Server error" });
	}
};

const getTicketById = async (req, res) => {
	try {
		const { id } = req.params;
		const [ticket] = await db.execute("SELECT * FROM tickets WHERE id = ?", [
			id,
		]);
		if (ticket.length === 0) {
			return res.status(404).json({ message: "Ticket not found" });
		}
		res.status(200).json(ticket[0]);
	} catch (error) {
		console.error(error);

		res.status(500).json({ message: "Server error" });
	}
};

const updateTicketStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const allowedStatus = ["open", "in_progress", "resolved", "closed"];
		if (!allowedStatus.includes(status)) {
			return res.status(400).json({
				message: "Invalid status",
			});
		}
		const [result] = await db.execute(
			"UPDATE tickets SET status = ? WHERE id = ?",
			[status, id],
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: "Ticket not found",
			});
		}
		res.status(200).json({ message: "Status updated successfully" });
	} catch (error) {
		console.error(error);

		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	createTicket,
	getTickets,
	getTicketById,
	updateTicketStatus,
};
