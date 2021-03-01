import { Injectable } from '@angular/core';
import { IProducts } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<IProducts> = [
    {
      id: 1,
      title: 'Yōkoso Jitsuryoku Shijō Shugi no Kyōshitsu e',
      url: 'Classroom_of_the_elite',
      image: 'assets/images/COTE_cover.jpg',
      author: 'Shougo Kinugasa',
      price: 230
    }
  ]
  constructor() { }
}
