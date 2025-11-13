
import { Request } from "express"
import config from "./config"
import Dog, { IDog } from "./dog";


export function root(_req: any, res: any) {
    res.send("Müködik az API szerver!!!")
}
export async function getAllData(_req: any, res: any) {

    const conn = await config.connection;

    // A simple SELECT query
    try {
        const [results] = await conn.query(
            'SELECT * FROM dog'
        );

        if (results.length === 0) {
            res.status(404).send("Nincs ilyen adat!")
            return
        }
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
    }




}

export async function getDataFromId(req: any, res: any) {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }
    const conn = await config.connection;

    // A simple SELECT query
    try {
        const [results] = await conn.query(
            'SELECT * FROM dog where id = ?', [id]
        );

        if (results.length === 0) {
            res.status(404).send("Nincs ilyen adat!")
            return
        }
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
    }

    res.status(200).send()

}

export async function insertData(req: Request, res: any) {
    console.log(req.body)

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    const dog = new Dog(req.body as unknown as IDog)
    if (dog.name === null || dog.name === undefined || dog.name === "") {
        res.status(400).send('Nem adott meg minden adatot!')
        return
    }
    const conn = await config.connection;
    try {
        const [results] = await conn.query(
            'insert into dog values (null,?,?,?,?,?)', [dog.name, dog.breed, dog.gender, dog.age, dog.picurl]
        ) as Array<any>
        res.status(200).send(results.insertId)
    } catch (err) {
        console.log(err);
    }

    res.status(201).send(dog)
}

export const deleteDataFromId = async (req: Request, res: any) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    const conn = await config.connection;
    try {
        const [results] = await conn.query(
            'delete FROM dog where id = ?', [id]
        );
        res.status(200).send(results.affectedRows)
    } catch (err) {
        console.log(err);
    }


}

export const putData = async (req: Request, res: any) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }



    let reqDog: any = new Dog(req.body as unknown as IDog)

    const allowedField = ['name', 'breed', 'gender', 'age', 'picurl']
    const keys = Object.keys(reqDog).filter(key => allowedField.includes(key))
    if (keys.length === 0) {
        return res.status(400).send({ error: 103, message: "Nincs frisítendő mező!" })
    }

    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => reqDog[key])
    values.push(id)
    const conn = await config.connection;


    const sqlCmd = `update dog set ${updateString} where id=?`

    console.log(sqlCmd)

    try {
        const [results] = await conn.query(
            sqlCmd, values
        );

        if (results.affectedRows != 0) {
            return res.status(200).send({ success: true, message: "Az adatok modosítása sikeresen megtörtént!" })

        }
        insertData(req, res)

    } catch (err) {
        console.log(err);
    }

}

export const patchData = async (req: Request, res: any) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }



    let reqDog: any = new Dog(req.body as unknown as IDog)

    const allowedField = ['name', 'breed', 'gender', 'age', 'picurl']
    const keys = Object.keys(reqDog).filter(key => allowedField.includes(key))
    if (keys.length === 0) {
        return res.status(400).send({ error: 103, message: "Nincs frisítendő mező!" })
    }

    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => reqDog[key])
    values.push(id)
    const conn = await config.connection;


    const sqlCmd = `update dog set ${updateString} where id=?`

    console.log(sqlCmd)

    try {
        const [results] = await conn.query(
            sqlCmd, values
        );

        if (results.affectedRows != 0) {
            return res.status(200).send({ success: true, message: "Az adatok modosítása sikeresen megtörtént!" })

        }
        res.status(200).send({ success: false, message: "Adatmódosítás nem történt" })

    } catch (err) {
        console.log(err);
    }
}
