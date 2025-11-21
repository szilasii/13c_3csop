import express, {Router} from "express"
import signIn from "./userController"
const router: Router = express.Router()

router.post('/signIn',signIn)


export default router