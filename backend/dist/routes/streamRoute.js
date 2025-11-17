import express from "express";
import { streamSchema } from "../types/streamTypes.js";
import { pool } from "../db/db.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.post('/start', auth, async (req, res) => {
    const parsedData = streamSchema.safeParse(req.body);
    if (!parsedData) {
        return res.json(404).json("not a valid title");
    }
    //@ts-ignore
    const id = req.id;
    const { title } = req.body;
    const data = await pool.query('INSERT INTO streams(title, userId) VALUES($1, $2) RETURNING id', [title, id]);
    if (!data) {
        return res.status(400).json("unable to start new stream, try again");
    }
    return res.status(200).json({ 'streamId': data.rows[0].id });
});
export default router;
//# sourceMappingURL=streamRoute.js.map