import dotenv from "dotenv"
import mysql from 'mysql2/promise'
import path from "path"
dotenv.config()

class DBConfig {
    constructor() {

        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        })
    }
}

const config: any = {

    connection: new DBConfig(),
    jwtSecret: process.env.JWT_SECRET,
    maxSize: parseInt(process.env.MAX_FILE_SIZE ?? "2097152"),
    baseDir: path.win32.resolve(__dirname, "../../"),
    uploadDir: process.env.UPLOAD_DIR_NAME ?? "/uploads/"
}

export default config