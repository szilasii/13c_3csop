import mysql from "mysql2/promise"
import config from "../config/config"
import jwt from "jsonwebtoken"
const signIn = async (req:any,res:any) => {
const {email, password} = req.body

 if (!(email && password)) {
        return res.status(400).send({ error: "Nem megfelelően megadott adatok!" })
    }
const conn = await config.connection;
 try {
    const [results]:any = await conn.query(
        'select login (?,?) as id', [email, password]
    )
    if (!results[0].id) {
         return res.status(401).send({ error: "Nem megfelelő felhasználónév vagy jelszó!" })
    }
    if(!config.jwtSecret) {
        return res.status(401).send("Hiba a titkos kulcsnál!") 
    }
    const token = jwt.sign({userId:results[0].id},config.jwtSecret,{expiresIn:"2h"})

    res.status(200).send({token:token})

 }  
catch (err) {
    console.log(err)
}
}

export default signIn