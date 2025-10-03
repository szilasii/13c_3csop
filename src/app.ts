import express from "express"
import router from "./routes"
import bodyParser from "body-parser"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/',router)



export default app