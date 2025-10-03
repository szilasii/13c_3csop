import data from "./data"
import { Request } from "express"


export function root (_req: any, res: any) {
    res.send("Müködik az API szerver!!!")
}
export function getAllData(_req:any, res:any) {
    res.status(200).send(data)
}

export function getDataFromId(req:any, res:any) {
    const id:number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }
    const dog = data.find((element:any) => element.id === id)

    if (!dog) {
        res.status(404).send('Nem találhat ilyen id-vel rendelkező elem')
        return
    }

    res.status(200).send(dog)

}

export function insertData (req:Request,res:any) {
    console.log(req.body)

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    const dog = req.body
    if(dog.nev === null || dog.nev === undefined || dog.nev==="") {
        res.status(400).send('Nem adott meg minden adatot!')
        return
    }
    
    if (data.length>0)
    {
        dog.id = Math.max(...data.map((d: any) => d.id)) + 1
    } else {
        dog.id = 1
    }
   
   
    res.status(201).send(dog)
}

export const deleteDataFromId = (req:Request,res:any) => {
     const id:number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

 

    const index = data.findIndex((element:any) => element.id === id)

    if (index === -1) {
        res.status(404).send('Nem találhat ilyen id-vel rendelkező elem')
        return
    }
    data.splice(index,1)
    res.status(204).
    send()
}

export const putData = (req:Request,res:any) => {
     const id:number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    let reqDog = req.body

    if(reqDog.nev === null || reqDog.nev === undefined || reqDog.nev==="") {
        res.status(400).send('Nem adott meg minden adatot!')
        return
    }


    const index = data.findIndex((element:any) => element.id === id)

    if (index === -1) {
        insertData(req,res)
        return
    }

    reqDog.id = id
    data[index] = reqDog
    res.status(201).send(data)

}

export const patchData = (req:Request,res:any) => {
     const id:number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Nem megfelelő az Id értéke!')
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    const index = data.findIndex((element:any) => element.id === id)
     if (index === -1) {
        res.status(404).send('Nem találhat ilyen id-vel rendelkező elem')
        return
    }

    let reqDog = req.body

    // data[index].nev = reqDog.nev || data[index].nev
    // data[index].fajta  = reqDog.fajta || data[index].fajta
    // data[index].eletkor  = reqDog.eletkor || data[index].eletkor
    // data[index].nem  = reqDog.nem || data[index].nem
    // data[index].kepUrl  = reqDog.kepUrl || data[index].kepUrl


    Object.assign(data[index], {
        nev: reqDog.nev || data[index].nev,
        fajta: reqDog.fajta || data[index].fajta,
        eletkor: reqDog.eletkor || data[index].eletkor,
        nem: reqDog.nem || data[index].nem,
        kepUrl: reqDog.kepUrl || data[index].kepUrl
    })


    res.status(201).send(data)
}
