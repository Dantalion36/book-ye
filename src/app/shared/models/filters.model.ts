import { IFilter } from "../interfaces/filters.interface";

export class Filter implements IFilter {
    constructor(
        public name: string,
        public section: string
    ){}
}