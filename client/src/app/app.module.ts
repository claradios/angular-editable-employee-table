import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { LayoutModule } from './layout/layout.module';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const config = {
  api: 'https://localhost:5555/'
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
        path:'all',
        component: EmployeeListComponent
      },
      {
        path:'new',
        component: EmployeeCreateComponent
      },
      {
        path:':id',
        component:EmployeeDetailComponent
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
    LayoutModule
  ],
  providers: [
    { provide: 'config', useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
