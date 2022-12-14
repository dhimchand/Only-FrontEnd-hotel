import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
