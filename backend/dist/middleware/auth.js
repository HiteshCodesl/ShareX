import jwt from "jsonwebtoken";
export async function auth(req, res, next) {
    try {
        console.log("inside middleware", process.env.JWT_SECRET);
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json("token is not available");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded in middleware", decoded);
        if (decoded) {
            //@ts-ignore
            req.id = decoded.id;
            next();
        }
    }
    catch (error) {
        console.log("error in middleware", error);
    }
}
//# sourceMappingURL=auth.js.map