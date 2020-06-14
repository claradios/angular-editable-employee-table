import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import {MatIconModule, MatIcon} from '@angular/material/icon';


@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ]
})
export class LayoutModule { }
