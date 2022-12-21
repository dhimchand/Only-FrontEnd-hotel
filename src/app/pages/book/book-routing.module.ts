import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path:'',
    component: BookListComponent
  },
  {
    path:'form/:id',
    component: BookFormComponent
  },
  {
    path:'form',
    component: BookFormComponent
  },
  {
    path:'rooms',
    component: RoomComponent
  }

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
