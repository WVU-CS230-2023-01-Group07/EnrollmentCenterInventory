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
import { NavBarComponent } from './Components/Common/nav-bar/nav-bar.component';
import { ProductListComponent } from './Components/LayoutComponents/product-list/product-list.component';
import { initializeApp,provideFirebaseApp, getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './Components/LayoutComponents/product-list/item.add-remove-service';


@NgModule({
  declarations: [
    AppComponent,
    SignInLayoutComponent,
    SignOutLayoutComponent,
    HomeLayoutComponent,
    SearchItemsLayoutComponent,
    ReportLayoutComponent,
    AuditLayoutComponent,
    AddRemoveLayoutComponent,
    NavBarComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

