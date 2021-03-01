import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProducts } from 'src/app/shared/interfaces/products.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  adminProducts: Array<IProducts> = [];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  private getProducts(): void {
    
  } 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
