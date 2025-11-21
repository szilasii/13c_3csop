import {Router} from "express"
import { deleteDataFromId, getAllData, getDataFromId, insertData, patchData, putData, root } from "./dogController"
import verifyToken from "../middleware/auth"
const router : Router = Router()


router.get('/dogs',verifyToken,getAllData)
router.get('/dogs/:id', getDataFromId)
router.post('/dogs',insertData)
router.delete('/dogs/:id',deleteDataFromId)
router.put('/dogs/:id',putData)
router.patch('/dogs/:id',patchData)
export default router