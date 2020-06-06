import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
