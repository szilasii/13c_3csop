import config from "../config/config"
import fs from "fs"
export interface IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    mimeType?:string
    fileSize?: number
    userId?:number
}
export interface IMulterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}
export class File implements IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    mimeType?: string
    fileSize?: number
    userId?: number
    constructor(file: IMulterFile, userId: number) {
         this.fileId = file.filename
            this.fileName = file.originalname
            this.mimeType = file.mimetype
            this.fileSize = file.size
            this.userId = userId
    }
    async saveToDatabase () {
        const conn = await config.connection;
    try {
        await conn.beginTransaction()
        let [results]:any = await conn.query(
            'insert into files (fileId,fileName,mimeType,fileSize) values (?,?,?,?)', 
            [this.fileId,this.fileName,this.mimeType,this.fileSize]
        )
        if (results.affectedRows === 0) {
            throw "Hiba a 'Files' táblába történt adaatok beszúrásakor!"
        }
         [results] = await conn.query(
            'insert into userFiles values (?,?)', 
            [this.userId,this.fileId]
        )
        if (results.affectedRows === 0) {
            throw "Hiba a 'userFiles' táblába történt adaatok beszúrásakor!"
        }
     await conn.commit();
    } catch (err) {
        console.log(err)
        this.deleteFileDir()
        await conn.rollback();
        throw err
    }
    }

     deleteFileDir () {
        try {
            fs.unlinkSync(config.baseDir + config.uploadDir + this.fileId)
        } catch (err) {
               console.log(err) 
        }
    }
}