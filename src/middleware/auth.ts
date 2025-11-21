import jwt from "jsonwebtoken"
import config from "../config/config"

const verifyToken = (req:any,res:any,next:any) => {
    const token = req.body?.token || req.query?.token || req.headers?.["x-access-token"]
    if (!token) {
        return res.status(403).send("Token szükséges a hozzáféréshez")
    }
    try {
        if(!config.jwSecret) {

        }
    }catch(e) {}

    next()
}


export default verifyToken