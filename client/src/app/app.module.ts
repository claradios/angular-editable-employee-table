import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { LayoutModule } from './layout/layout.module';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

const config = {
  api: 'http://localhost:5555/'
};

const ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path:'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path:'new',
        component: EmployeeCreateComponent
      }
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    { provide: 'config', useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
