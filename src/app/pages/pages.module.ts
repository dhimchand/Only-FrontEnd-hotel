import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SessionService } from '../shared/services/session.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
