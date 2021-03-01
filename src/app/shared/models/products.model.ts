import { IProducts } from "../interfaces/products.interface";

export class Products implements IProducts {
    constructor (
        public id: number,
        public title: string,
        public url: string,
        public image: string,
        public author: string,
        public price: number
    ){}
}