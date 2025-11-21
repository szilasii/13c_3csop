import express, {Router} from "express"
import { root } from "../dog/dogController"
const router: Router = express.Router()
router.get('/', root)
export default router