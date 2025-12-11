import config from "../config/config"
import multer from "multer"
import util from "util"


const storage = multer.diskStorage({
    destination: (_req:any,_res:any,cb:any) => {
        cb(null,config.baseDir + config.uploadDir)
    }
})
const uploadFile = multer ({
    storage: storage,
    limits:{fileSize: config.fileSize}
}).single("file")

const uploadFiles = multer ({
    storage: storage,
    limits:{fileSize: config.fileSize}
}).array("files",10)

export const uploadMiddleware = util.promisify(uploadFile)
export const uploadMiddlewareMultiple = util.promisify(uploadFiles)