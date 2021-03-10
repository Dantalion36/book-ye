import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ISubCategory } from 'src/app/shared/interfaces/sub-category.interface';
import { SubCategory } from 'src/app/shared/models/sub-category.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-sub-categories',
  templateUrl: './admin-sub-categories.component.html',
  styleUrls: ['./admin-sub-categories.component.scss']
})
export class AdminSubCategoriesComponent implements OnInit {
  adminCategories: Array<any> = [];
  adminSubCategories: Array<any> = [];
  subCatName: string;
  subCatURLName: string;
  subCatID: string;
  subCatParent: ICategory;
  modalRef: BsModalRef;

  constructor(private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
  }

  addSubCategory(): void {
    const newCat = new SubCategory(this.subCatName, this.subCatURLName, this.subCatParent);
    this.apiService.addFireCloudSubCategory(newCat)
      .then(() => console.log('Add category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }

  private getSubCategories(): void {
    this.apiService.getFireCloudSubCategories().snapshotChanges().pipe(
      map(collection =>
        collection.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminSubCategories = data;
    });
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

  deleteSubCategory(subCategory: ISubCategory): void {
    this.apiService.deleteFireCloudSubCategory(subCategory.id.toString())
      .then(() => console.log('delete category success'))
      .catch(err => console.log(err));
  }

  updateSubCategory(): void {
    const editCat = new SubCategory(this.subCatName, this.subCatURLName, this.subCatParent );
    this.apiService.updateFireCloudSubCategory(this.subCatID, editCat)
      .then(() => console.log('update category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, subCategory: ISubCategory): void {
    this.modalRef = this.modalService.show(template);
    this.subCatID = subCategory.id.toString();
    this.subCatName = subCategory.name;
    this.subCatURLName = subCategory.urlName;
    this.subCatParent = subCategory.parentCategory;
  }

}
