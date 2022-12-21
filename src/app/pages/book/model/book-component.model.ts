import { FormGroup } from '@angular/forms';
import { Book } from './book.model';

export interface IBookFormComponent {
  booking?: Book;
  bookingGroup: FormGroup;
  onSubmitReservation(): void;
  onFormReset(): void;
}

export interface IBookListComponent {
  bookings: Book[];
  onReserve(booking: Book): void;
  onCheckIn(bookingId: number): void;
  onCheckOut(bookingId: number, roomNumber : number): void;
  onDeleteReservation(bookingId: number): void;
}
