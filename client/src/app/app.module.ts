import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    LoginComponent,
    ButtonDetailComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AmazingTimePickerModule,
    NgDatepickerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    DpDatePickerModule,
    MatNativeDateModule
  ],
  providers: [ApiService, LoginServiceService, MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from "./service/api.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginServiceService } from './components/app-component/login-service.service';
import { LoginComponent } from './components/login/login.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonDetailComponent } from './components/employee-list/button-details.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgDatepickerModule } from "ng2-datepicker";
import { DatepickerOptions } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DpDatePickerModule } from 'ng2-date-picker';
// import { NgDatepickerModule } from 'ng2-datepicker/dist/src/ng-datepicker/module/ng-datepicker.module';


