import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next:NextFunction){
    try{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json("token is not available")
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    console.log("decoded in middleware", decoded);

    if(decoded){
        //@ts-ignore
       req.id = decoded.id;
       next();
    }
   }catch(error){
     console.log("error in middleware", error);
   }
}