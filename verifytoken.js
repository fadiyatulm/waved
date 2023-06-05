import jwt from "jsonwebtoken";

export const  verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token == null){
        return res.status(401).json({
            status: "fail",
            message: "Tidak ada token"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err){
            return res.status(403).json({
                status: "fail"
            })
        }

        req.email = decoded.email;
        next();
    })
}