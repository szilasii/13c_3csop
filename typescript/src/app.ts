import data from "./data.js";
import Kutya, {IKutya} from "./kutya.js";
let adatKutya: IKutya
if (data[0]) {
    adatKutya = data[0]
    console.log(adatKutya)
    const kutya:Kutya = new Kutya(data[0]) 
    console.log(kutya)
}


