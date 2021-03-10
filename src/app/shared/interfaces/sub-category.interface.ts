import { ICategory } from "./category.interface";

export interface ISubCategory {
    name: string;
    urlName: string;
    parentCategory: ICategory;
    id?: string;
}