import express from "express";
import { postSchema } from "../types/postTypes.js";
import { auth } from "../middleware/auth.js";
import { pool } from "../db/db.js";
const router = express.Router();
router.post("/create", auth, async (req, res) => {
    const parsedData = postSchema.safeParse(req.body);
    if (!parsedData.data) {
        return res.status(401).json("title or content is invalid");
    }
    try {
        const { title, content } = parsedData?.data;
        //@ts-ignore
        const userid = req.id;
        console.log("userId", userid);
        const createPost = await pool.query('INSERT INTO posts(title, content, userid) VALUES($1, $2, $3) RETURNING id, title, content, postedat, likes, userid', [title, content, userid]);
        if (createPost) {
            return res.status(200).json([createPost.rows[0]]);
        }
    }
    catch (error) {
        return res.status(400).json({ 'error while creating post': error });
    }
});
router.delete('/remove/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log({ "id from the param": id });
    try {
        const deletePost = await pool.query('DELETE FROM posts WHERE ID = $1', [id]);
        if (deletePost) {
            return res.status(200).json('post deleted successfully');
        }
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
//# sourceMappingURL=postRoute.js.map