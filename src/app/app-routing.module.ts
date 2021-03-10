import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { DistributionComponent } from './pages/distribution/distribution.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSubCategoriesComponent } from './admin/admin-sub-categories/admin-sub-categories.component';
import { AdminFiltersComponent } from './admin/admin-filters/admin-filters.component';

import { ProfileGuard } from './shared/guards/profile.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'catalogue/:category', component: CatalogueComponent },
  { path: 'distribution', component: DistributionComponent },
  { path: 'product', component: ProductComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'categories', component: AdminCategoriesComponent },
    { path: 'sub-categories', component: AdminSubCategoriesComponent },
    { path: 'products', component: AdminProductsComponent },
    { path: 'filters', component: AdminFiltersComponent },
  ] },
  { path: '**', redirectTo: 'home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
