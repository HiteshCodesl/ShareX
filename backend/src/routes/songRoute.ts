import express from "express"
import { songSchema } from "../types/songTypes.js";
import { pool } from "../db/db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post('/add', auth, async(req, res) => {
     const parsedData = songSchema.safeParse(req.body);
     if(!parsedData.data){
         return res.status(404).json({error: "song data is not correct"})
     }

     const {streamId, youtubeId} = parsedData.data;
     
     //@ts-ignore
     const addedById = req.id;

     const response = await pool.query('INSERT INTO song(streamId, youtubeId, addedById) VALUES($1, $2, $3) RETURNING youtubeId, streamId, played', [streamId, youtubeId, addedById])

     if(response.rows.length < 0){
         return res.status(404).json({error: "song was not added"})
     }
     return res.status(200).json({data: response.rows[0]});
})


export default router;