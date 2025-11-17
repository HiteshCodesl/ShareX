import express from "express";
import { connectToDb } from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import streamRoute from "./routes/streamRoute.js";
import songRoute from "./routes/songRoute.js";
import cors from "cors";
const app = express();
connectToDb();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/stream', streamRoute);
app.use('/api/song', songRoute);
export default app;
//# sourceMappingURL=index.js.map