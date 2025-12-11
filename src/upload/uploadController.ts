import config from "../config/config"
import fs from "fs"
import mysql from "mysql2/promise"
import { File, IFile, IMulterFile } from "../file/file"
import { uploadMiddleware, uploadMiddlewareMultiple } from "../middleware/upload"

export const getFileList =  async (req: any, res: any) => {
    const conn = await config.connection

    const [results] : any = await conn.query(
        "Select * from files join userFiles on userFiles.fileId = files.fileId where userFiles.userId = ?", [req.user.userId]
    )
    if (results.length ===0) {
        return res.status(404).send("nincs megjelenítendő adat")
    }
    const fileInfos : any[] = []
    results.map((file: IFile) => {
         fileInfos.push({ name: file, url: "http://localhost:3000/file/" + file.fileId })
    })

    res.status(200).send(fileInfos)
   
}
export const downloadFile = async (req: any, res: any) => {
    const filename: string = req.params.id
    const dirPath = config.baseDir + config.uploadDir
    const conn = await config.connection
    const [results]:any = await conn.query(
        "Select * from files join userFiles on userFiles.fileId = files.fileId where userFiles.userId = ? and files.fileId = ?", [req.user.userId,filename]
    )
     if (results.length ===0) {
        return res.status(404).send("Nincs meg a fájl!")

    }
    res.download(dirPath + filename, results[0].fileName, (err: any) => {
        if (err) {
            res.status(500).send({ error: "hiba a fájl letöltésekor!" })
        }
    })

}
export const uploadFile = async (req: any, res: any) => {
    try {
        await uploadMiddleware(req, res)
        if (req.file === undefined) {
            return res.status(400).send({ error: "Töltsön fel fájlt!" })
        }

        const file = new File(req.file, req.user.userId)
        await file.saveToDatabase()

        res.status(200).send({ message: `Fájl feltöltése sikeres! ${req.file.originalname}` })

    } catch (err) {
        console.log(err)
        res.status(500).send({ error: `Hiba a fájl feltöltése során!  ${req.file.originalname}` })
    }


}

export const uploadFileMultiple = async (req: any, res: any) => {
    try {
        await uploadMiddlewareMultiple(req, res)
        if (req.files === undefined) {
            return res.status(400).send({ error: "Töltsön fel fájlt!" })
        }
        req.files.map(async (file: IMulterFile) => {
            const newFile = new File(file, req.user.userId)
            await newFile.saveToDatabase()
        })


        res.status(200).send({ message: "Fájl(ok) feltöltése sikeres!" })



    } catch (err) {
        console.log(err)
        res.status(500).send({ error: `Hiba a fájl(ok) feltöltése során!` })
    }
}