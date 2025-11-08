import express from "express";
import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../types/userTypes.js";
import { signInSchema } from "../types/userTypes.js";
import dotenv from "dotenv"
import { auth } from "../middleware/auth.js";


dotenv.config();
const router = express.Router();

router.post('/signup', async(req, res) => {
    
    const parsedData = signUpSchema.safeParse(req.body);
    
    if(!parsedData.success){
        return res.status(401).json("wrong credentials")
    }
    const {email, username, password} = parsedData.data;
    
    try{
    const isUserAlreadyExist = await pool.query('SELECT FROM users WHERE email = $1', [email]);

    if(isUserAlreadyExist.rows.length > 0){
        return res.status(401).json("user already exist, try signing in")
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await pool.query('INSERT INTO USERS(username, email, password) VALUES($1, $2,$3) RETURNING id, username, email', [username, email, hashedPassword]);

    if(user.rows.length > 0){
        return res.status(401).json("failed to create a user, try again")
    }
    }catch(error){
      return console.log("error in signup", error)
    }
})


router.post('/login', async(req, res) => {
    
    const parsedData = signInSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(401).json("wrong credentials")
    }

    const {email, password} = parsedData.data;
   
   try{
   const isUserExists = await pool.query('SELECT id, username, password FROM users WHERE email=$1', [email]);

   if(!isUserExists){
    return res.status(404).json("user not found");
   }

   const checkPassword = await bcrypt.compare(password, isUserExists.rows[0].password);

   if(!checkPassword){
    return res.status(404).json("username or password is wrong");
   }
     console.log("username", isUserExists.rows[0].username)

   const token = jwt.sign({
      id: isUserExists.rows[0].id,
   }, process.env.JWT_SECRET!)

   if(token){
      res.status(200).json({token: token})
   }
   }catch(error){
    return console.log("error while signing in", error)
   }
})

router.get('/profile', auth, async(req, res) => {
    //@ts-ignore
    const id = req.id;
    console.log("userId in profile", id);
    const user = await pool.query('SELECT username, email, id FROM users WHERE id=$1', [id]);

    console.log("userprofile", user.rows[0]);

    if(user){
        return res.status(200).json(user.rows[0]);
    }
})

export default router;