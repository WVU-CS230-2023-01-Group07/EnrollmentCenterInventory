import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './Layouts/home-layout/home-layout.component';
import { AuditLayoutComponent } from './Layouts/audit-layout/audit-layout.component';
import { AddRemoveLayoutComponent } from './Layouts/add-remove-layout/add-remove-layout.component';
import { ReportLayoutComponent } from './Layouts/report-layout/report-layout.component';
import { SearchItemsLayoutComponent } from './Layouts/search-items-layout/search-items-layout.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { SignOutLayoutComponent } from './Layouts/sign-out-layout/sign-out-layout.component';
import { FoundLayoutComponent } from './Layouts/found-layout/found-layout.component';
import { ProductNotFoundLayoutComponent } from './Layouts/product-not-found-layout/product-not-found-layout.component';

const routes: Routes = [   
  {
  path: 'home',
  component: HomeLayoutComponent
 },
 {
  path: 'audit',
 component: AuditLayoutComponent
},
{
  path: 'add-remove',
  component: AddRemoveLayoutComponent
},
{
  path: 'report',
  component: ReportLayoutComponent
},
{
  path:'search',
  component: SearchItemsLayoutComponent
},
{
  path: '',
  component: SignInLayoutComponent
},
{
  path: 'sign-out',
  component: SignOutLayoutComponent
},
{
  path: 'found',
  component: FoundLayoutComponent
},
{
  path: 'not-found',
  component: ProductNotFoundLayoutComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }