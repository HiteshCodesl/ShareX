import express from "express";
import { connectToDb } from "./db/db.js";
import userRoutes from "./routes/userRoute.js"
import postRoutes from "./routes/postRoute.js"

const app = express();

connectToDb();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;