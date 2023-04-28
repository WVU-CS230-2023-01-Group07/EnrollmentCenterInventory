import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './Layouts/home-layout/home-layout.component';
import { AuditLayoutComponent } from './Layouts/audit-layout/audit-layout.component';
import { AddRemoveLayoutComponent } from './Layouts/add-remove-layout/add-remove-layout.component';
import { ReportLayoutComponent } from './Layouts/report-layout/report-layout.component';
import { SearchItemsLayoutComponent } from './Layouts/search-items-layout/search-items-layout.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { SignOutLayoutComponent } from './Layouts/sign-out-layout/sign-out-layout.component';
import { SignUpLayoutComponent } from './Layouts/sign-up-layout/sign-up-layout.component';
import { ProductNotFoundLayoutComponent } from './Layouts/product-not-found-layout/product-not-found-layout.component';
import { AuthGuard } from './Components/Common/auth.guard';
import { UpdateItemLayoutComponent } from './Layouts/update-item-layout/update-item-layout.component';

const routes: Routes = [   
  {
  path: 'home',
  component: HomeLayoutComponent, canActivate: [AuthGuard]
 },
 {
  path: 'audit',
 component: AuditLayoutComponent, canActivate: [AuthGuard]
},
{
  path: 'add-remove',
  component: AddRemoveLayoutComponent, canActivate: [AuthGuard]
},
{
  path: 'report',
  component: ReportLayoutComponent, canActivate: [AuthGuard]
},
{
  path:'search',
  component: SearchItemsLayoutComponent, canActivate: [AuthGuard]
},
{
  path: '',
  component: SignInLayoutComponent
},
{
  path: 'sign-out',
  component: SignOutLayoutComponent, canActivate: [AuthGuard]
},
{
  path: 'sign-up',
  component: SignUpLayoutComponent, canActivate: [AuthGuard]
},
{
  path: 'not-found',
  component: ProductNotFoundLayoutComponent, canActivate: [AuthGuard]
},
{
  path: 'audit/update-item',
  component: UpdateItemLayoutComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }