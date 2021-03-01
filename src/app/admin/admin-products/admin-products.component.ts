import { Component, OnInit} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  adminCategories: Array<ICategory>;
  adminProducts: Array<IProduct> = [];
  prodName: string;
  prodURL: string;
  prodImage: string;
  upload: any;
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    this.upload = this.afStorage.upload(filePath, file);
  }

}
