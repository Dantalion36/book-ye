import { ICategory } from "../interfaces/category.interface";
import { ISubCategory } from "../interfaces/sub-category.interface";

export class SubCategory implements ISubCategory {
    constructor(
        public name: string,
        public urlName: string,
        public parentCategory: ICategory
    ){}
}