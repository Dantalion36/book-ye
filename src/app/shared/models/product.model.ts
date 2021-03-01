import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    constructor (
        public name: string,
        public url: string,
        public category: ICategory,
        public image: string,
        public author: string,
        public price: number,
    ){}
}