import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { SignOutLayoutComponent } from './Layouts/sign-out-layout/sign-out-layout.component';
import { HomeLayoutComponent } from './Layouts/home-layout/home-layout.component';
import { SearchItemsLayoutComponent } from './Layouts/search-items-layout/search-items-layout.component';
import { ReportLayoutComponent } from './Layouts/report-layout/report-layout.component';
import { AuditLayoutComponent } from './Layouts/audit-layout/audit-layout.component';
import { AddRemoveLayoutComponent } from './Layouts/add-remove-layout/add-remove-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInLayoutComponent,
    SignOutLayoutComponent,
    HomeLayoutComponent,
    SearchItemsLayoutComponent,
    ReportLayoutComponent,
    AuditLayoutComponent,
    AddRemoveLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
