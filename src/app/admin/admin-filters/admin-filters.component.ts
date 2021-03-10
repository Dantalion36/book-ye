import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IFilter } from 'src/app/shared/interfaces/filters.interface';
import { Filter } from 'src/app/shared/models/filters.model';


@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.scss']
})
export class AdminFiltersComponent implements OnInit {
  adminFilters: Array<any> = [];
  fltrName: string;
  fltrSection: string;
  fltrID: string;
  modalRef: BsModalRef;

  constructor(private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getFilters();
  }

  addFilter(): void {
    const newFilter = new Filter(this.fltrName, this.fltrSection);
    this.apiService.addFireCloudFilter(newFilter)
      .then(() => console.log('Add category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }

  private getFilters(): void {
    this.apiService.getFireCloudFilters().snapshotChanges().pipe(
      map(collection =>
        collection.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminFilters = data;
    });
  }

  deleteFilter(filter: IFilter): void {
    this.apiService.deleteFireCloudFilter(filter.id.toString())
      .then(() => console.log('delete category success'))
      .catch(err => console.log(err));
  }

  updateFilter(): void {
    const editFltr = new Filter(this.fltrName, this.fltrSection);
    this.apiService.updateFireCloudFilter(this.fltrID, editFltr)
      .then(() => console.log('update category success'))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, filter: IFilter): void {
    this.modalRef = this.modalService.show(template);
    this.fltrID = filter.id.toString();
    this.fltrName = filter.name;
    this.fltrSection = filter.section;
  }
}
