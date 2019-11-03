import Clothing from '../models/clothing';

let id = -1;
const genId = () => {
    id = id + 1;
    return id.toString();
}

export const CLOTHINGS = [
    new Clothing(
        genId(),
        '../assets/icon.png'
    ),
    new Clothing(
        genId(),
        '../assets/splash.png'
    )
]

export default CLOTHINGS