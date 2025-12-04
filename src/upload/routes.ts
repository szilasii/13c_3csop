import express, {Router} from "express"
import { getFileList,downloadFile,uploadFile, uploadFileMultiple } from "./uploadController"
const router: Router = express.Router()
router.get('/files',getFileList)
router.get('/file/:id',downloadFile)
router.post('/file/upload',uploadFile)
router.post('/files/upload',uploadFileMultiple)
export default router