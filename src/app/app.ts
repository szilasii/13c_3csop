import express from "express"
import router from "../router/routes"
import bodyParser from "body-parser"
import dogRoutes from "../dog/routes"
import usersRoutes from "../users/routes"
import uploadRoutes from "../upload/routes"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(router)
app.use('/',dogRoutes)
app.use('/',usersRoutes)
app.use('/',uploadRoutes)




export default app