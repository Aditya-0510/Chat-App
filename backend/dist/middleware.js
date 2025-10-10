import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "ddd";
function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            message: "Token missing, user not authenticated"
        });
    }
    try {
        const user = jwt.verify(token, JWT_SECRET);
        // console.log(user);
        if (user) {
            //@ts-ignore
            req.user = user;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not loged in"
            });
        }
    }
    catch (e) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
export default authMiddleware;
//# sourceMappingURL=middleware.js.map