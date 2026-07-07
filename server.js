import { config } from "dotenv";

config();

import cors from "cors";
import express, { json } from "express";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();
app.use(cors());
app.use(json());
app.use("/api/tickets", ticketRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Running server on port, ${PORT}`);
});
