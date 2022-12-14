import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.util';
import { IBookListComponent } from '../model/book-component.model';
import { Book } from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, IBookListComponent {
  bookings: Book[]=[];
  nightlyFee : number = NIGHTLY_FEE;

  constructor(
    private readonly sessionService : SessionService,
    private readonly hotelService: HotelService,
    private readonly router: Router;
  ) { }


  onReserve(booking: Book): void {
    
  }
  onCheckIn(bookingId: number): void {
    throw new Error('Method not implemented.');
  }
  onCheckOut(bookingId: number): void {
    throw new Error('Method not implemented.');
  }
  onDeleteReservation(bookingId: number): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
