import { ICategory } from "./category.interface";

export interface IProduct {
    name: string;
    url: string;
    category: ICategory;
    image: string;
    author: string;
    price: number;
    id?: string;

}