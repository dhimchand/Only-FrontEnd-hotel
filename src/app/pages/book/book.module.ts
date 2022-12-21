import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { SessionService } from 'src/app/shared/services/session.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list/room-list.component';



@NgModule({
  declarations: [BookListComponent, BookFormComponent, RoomComponent, RoomListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BookRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BookModule { }
