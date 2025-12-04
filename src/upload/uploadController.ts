import config from "../config/config"
import fs from "fs"
import { uploadMiddleware } from "../middleware/upload"

export const getFileList = (req: any, res: any) => {
    const uploadPath = config.baseDir + config.uploadDir
    fs.readdir(uploadPath, function (err, files) {
        if (err) {
            console.log(err)
            res.status(500).send({ error: "hiba a fájlok olvasásakor" })
        }
        const fileInfos: any[] = []
        files.forEach(file => {
            fileInfos.push({ name: file, url: "http://localhost:3000/file/" + file })
        })
        res.status(200).send(fileInfos)
    })



}
export const downloadFile = (req: any, res: any) => {
    const filename: string = req.params.id
    const dirPath = config.baseDir + config.uploadDir
    res.download(dirPath + filename, filename, (err: any) => {
        if (err) {
            res.status(500).send({ error: "hiba a fájl letöltésekor!" })
        }
    })

}
export const uploadFile = async (req: any, res: any) => {
try {
    await uploadMiddleware(req,res)
    if (req.file === undefined) {
        return res.status(400).send({error: "Töltsön fel fájlt!"})
    }
    res.status(200).send({message:`Fájl feltöltése sikeres! ${req.file.originalname}`})

} catch (err) {
   console.log(err)
    res.status(500).send({ error: `Hiba a fájl feltöltése során!  ${req.file.originalname}`})
}


}

export const uploadFileMultiple = (req: any, res: any) => {

}