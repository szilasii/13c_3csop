import jwt from "jsonwebtoken"
import config from "../config/config"

const verifyToken = (req:any,res:any,next:any) => {
    const token = req.body?.token || req.query?.token || req.headers?.["x-access-token"]
    if (!token) {
        return res.status(403).send("Token szükséges a hozzáféréshez")
    }
    try {
        if(!config.jwtSecret) {
           return res.status(403).send("Hiba van a titkos kulcsal!") 
        }
        const decodedToken = jwt.verify(token,config.jwtSecret)
        req.user = decodedToken
        console.log(decodedToken)
        return next()
    }catch(e) {
        console.log(e)
    }

    res.status(401).send("Az auth nem sikerült!")
}


export default verifyToken