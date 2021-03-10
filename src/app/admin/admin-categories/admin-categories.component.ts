import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  adminCategories: Array<any> = [];
  catName: string;
  catURLName: string;
  catID: string;
  catParent: ICategory;
  modalRef: BsModalRef;

  constructor(private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(): void {
    const newCat = new Category(this.catName, this.catURLName);
    this.apiService.addFireCloudCategory(newCat)
      .then(() => console.log('Add category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();

  }

  private getCategories(): void {
    this.apiService.getFireCloudCategories().snapshotChanges().pipe(
      map(collection =>
        collection.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminCategories = data;
    });
  }

  deleteCategory(category: ICategory): void {
    this.apiService.deleteFireCloudCategory(category.id.toString())
      .then(() => console.log('delete category success'))
      .catch(err => console.log(err));
  }

  updateCategory(): void {
    const editCat = new Category(this.catName, this.catURLName);
    this.apiService.updateFireCloudCategory(this.catID, editCat)
      .then(() => console.log('update category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, category: ICategory): void {
    this.modalRef = this.modalService.show(template);
    this.catID = category.id.toString();
    this.catName = category.name;
    this.catURLName = category.urlName;
  }

}
