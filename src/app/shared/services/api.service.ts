import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { IFilter } from '../interfaces/filters.interface';
import { IProduct } from '../interfaces/product.interface';
import { ISubCategory } from '../interfaces/sub-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlCategory: string;
  private urlProduct: string;
  private dbCategoryPath = '/categories';
  private dbProductPath = '/products';
  private dbSubCategoryPath = '/sub-categories';
  private dbFilterPath = '/filters';

  categoriesRef: AngularFirestoreCollection<ICategory> = null;
  subCategoriesRef: AngularFirestoreCollection<ISubCategory> = null;
  productRef: AngularFirestoreCollection<IProduct> = null;
  filtersRef: AngularFirestoreCollection<IFilter> = null;

  constructor(private http: HttpClient, private db: AngularFirestore) {
    // this.urlCategory = 'http://localhost:3000/categories';
    // this.urlProduct = 'http://localhost:3000/products';

    this.categoriesRef = this.db.collection(this.dbCategoryPath);
    this.subCategoriesRef = this.db.collection(this.dbSubCategoryPath);
    this.productRef = this.db.collection(this.dbProductPath);
    this.filtersRef = this.db.collection(this.dbFilterPath);
   }

  getCategories(): Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(this.urlCategory);
  }

  postCategory(category: ICategory): Observable<ICategory>{
    return this.http.post<ICategory>(this.urlCategory, category);
  }

  deleteCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.urlCategory}/${id}`);
  }

  updateCategory(category: ICategory): Observable<ICategory>{
    return this.http.put<ICategory>(`${this.urlCategory}/${category.id}`, category);
  }

  getProducts(): Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(this.urlProduct);
  }

  postProduct(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>(this.urlProduct, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.urlProduct}/${id}`);
  }

  updateProduct(product: IProduct): Observable<IProduct>{
    return this.http.put<IProduct>(`${this.urlProduct}/${product.id}`, product);
  }

  getCategoryProducts(categoryName: string): Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.urlProduct}?category.urlName=${categoryName}`);
  }

  getOneProduct(productName: string): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.urlProduct}?urlName=${productName}`);
  }

  // ------------------ Firecloud Category ------------------------------ //

  addFireCloudCategory(category: ICategory): Promise<DocumentReference<unknown>> {
    return this.categoriesRef.add({...category});
  }

  getFireCloudCategories(): AngularFirestoreCollection<ICategory> {
    return this.categoriesRef;
  }

  deleteFireCloudCategory(id: string): Promise<void> {
    return this.categoriesRef.doc(id).delete();
  }

  updateFireCloudCategory(id: string, category: ICategory): Promise<void> {
    return this.categoriesRef.doc(id).update({...category});
  }

  // ------------------ Firecloud Product ------------------------------ //

  addFireCloudProduct(product: IProduct): Promise<DocumentReference<unknown>> {
    return this.productRef.add({...product});
  }

  getFireCloudProducts(): AngularFirestoreCollection<IProduct> {
    return this.productRef;
  }

  getFireCloudCategoryProducts(category: string): any {
    // return this.productsRef.ref.where('category.urlName', '==', category);
    return this.productRef.ref.where('category.urlName', '==', category);
  }

  getFireCloudOneProduct(name: string): any {
    return this.productRef.ref.where('urlName', '==', name);
  }

  deleteFireCloudProduct(id: string): Promise<void> {
    return this.productRef.doc(id).delete();
  }

  updateFireCloudProduct(id: string, product: IProduct): Promise<void> {
    return this.productRef.doc(id).update({...product});
  }

  // ------------------ Firecloud SubCategory ------------------------------ //

  addFireCloudSubCategory(subCategory: ISubCategory): Promise<DocumentReference<unknown>> {
    return this.subCategoriesRef.add({...subCategory});
  }

  getFireCloudSubCategories(): AngularFirestoreCollection<ISubCategory> {
    return this.subCategoriesRef;
  }

  deleteFireCloudSubCategory(id: string): Promise<void> {
    return this.subCategoriesRef.doc(id).delete();
  }

  updateFireCloudSubCategory(id: string, subCategory: ISubCategory): Promise<void> {
    return this.subCategoriesRef.doc(id).update({...subCategory});
  }

  // ------------------ Firecloud Filter ------------------------------ //

  addFireCloudFilter(filter: IFilter): Promise<DocumentReference<unknown>> {
    return this.filtersRef.add({...filter});
  }

  getFireCloudFilters(): AngularFirestoreCollection<IFilter> {
    return this.filtersRef;
  }

  deleteFireCloudFilter(id: string): Promise<void> {
    return this.filtersRef.doc(id).delete();
  }

  updateFireCloudFilter(id: string, filter: IFilter): Promise<void> {
    return this.filtersRef.doc(id).update({...filter});
  }

}
