
import { Request } from "express"
import config from "./config"


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

        if (results.length ===0) {
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
            'SELECT * FROM dog where id = ?',[id]
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

    const dog = req.body
    if (dog.nev === null || dog.nev === undefined || dog.nev === "") {
        res.status(400).send('Nem adott meg minden adatot!')
        return
    }
const conn = await config.connection;
try {
        const [results] = await conn.query(
            'insert into dog values (null,?,?,?,?,?)', [dog.nev,dog.fajta, dog.nem ? 1:0,parseInt(dog.eletkor as unknown as string),dog.kepUrl]
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
            'delete FROM dog where id = ?',[id]
        );
        res.status(200).send(results.affectedRows)
    } catch (err) {
        console.log(err);
    }


}

export const putData = (req: Request, res: any) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    let reqDog = req.body

    if (reqDog.nev === null || reqDog.nev === undefined || reqDog.nev === "") {
        res.status(400).send('Nem adott meg minden adatot!')
        return
    }



    res.status(201).send()

}

export const patchData = (req: Request, res: any) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }



    let reqDog = req.body

    // data[index].nev = reqDog.nev || data[index].nev
    // data[index].fajta  = reqDog.fajta || data[index].fajta
    // data[index].eletkor  = reqDog.eletkor || data[index].eletkor
    // data[index].nem  = reqDog.nem || data[index].nem
    // data[index].kepUrl  = reqDog.kepUrl || data[index].kepUrl


    // Object.assign(data[index], {
    //     nev: reqDog.nev || data[index].nev,
    //     fajta: reqDog.fajta || data[index].fajta,
    //     eletkor: reqDog.eletkor || data[index].eletkor,
    //     nem: reqDog.nem || data[index].nem,
    //     kepUrl: reqDog.kepUrl || data[index].kepUrl
    // })


    res.status(201).send()
}
