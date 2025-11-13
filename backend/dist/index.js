import express from "express";
import { connectToDb } from "./db/db.js";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";
const app = express();
connectToDb();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
export default app;
//# sourceMappingURL=index.js.map