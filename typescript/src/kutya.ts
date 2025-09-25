type Id = number | null

type Tdog = {
    id : Id;
    nev : string;
    fajta : string;
    nem: boolean;
    eletkor: number;
    kepUrl: string | null; 
}

export interface IKutya {
    id? : Id;
    nev : string;
    fajta : string;
    nem: boolean;
    eletkor: number;
    kepUrl: string | null; 
    valami? : any
}

export default class Kutya implements IKutya {
    id : number | null;
    nev!: string;
    fajta : string;
    nem: boolean;
    eletkor: number;
    kepUrl: string | null; 


    constructor (kutya: IKutya) {
        this.id = kutya.id || null;
        this.nev = kutya.nev
        this.fajta = kutya.fajta
        this.nem = kutya.nem
        this.eletkor = kutya.eletkor
        this.kepUrl = kutya.kepUrl

    }
    get Id() {
        return this.id
    }
    set Id (id: number | null) {
        this.id = id
    }
    
    
    kutya() {

    }
   
}

function valamiN (arg:number):number {
    return arg
} 



function valamiA (arg:any):any {
    return arg
} 

type Tipus = {
    id: number
    nev: string
    utca: string
}




interface GenericIfn {
    <IKutya>(arg:IKutya):IKutya
}

function ValamiG<IKutya> (arg:IKutya):IKutya {
    console.log(arg)
    return arg
}

let kiir: GenericIfn = ValamiG



kiir<IKutya>({id: 1,
  nev: 'Mendy',    
  fajta: 'keverék',
  nem: false,      
  eletkor: 3,      
  kepUrl: 'https://www.tappancs.hu/sites/default/files/styles/full_width_gallery/public/media/mendy20251.jpg'})


console.log(kiir)




