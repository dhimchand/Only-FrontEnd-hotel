import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.util';
import Swal from 'sweetalert2';
import { IBookListComponent } from '../model/book-component.model';
import { Book } from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, IBookListComponent {
  bookings: Book[] = [];
  nightlyFee: number = NIGHTLY_FEE;
  viewedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  formUrl: string = 'backoffice/book/form';

  constructor(
    private readonly sessionService: SessionService,
    private readonly hotelService: HotelService,
    private readonly router: Router
  ) {}

  onReserve(booking: Book): void {
    if (booking.status == 'checked-out') {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Customer ${booking.reserve.name} tidak dapat melakukan pengubahan durasi malam dikarenakan sudah melakukan ${booking.status}`,
      });
    } else {
      this.router.navigateByUrl(`${this.formUrl}/${booking.id}`);
    }
  }
  onCheckIn(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status == 'checked-out') {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: `customer ${booking.reserve.name} telah ${booking.status}, tidak dapat melakukan check-in lagi`,
          });
        } else {
          this.hotelService.checkIn(bookingId).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Check-in',
            text: `customer ${booking.reserve.name} berhasil melakukan chek-in pada kamar ${booking.roomNumber}`,
          });
        }
      },
    });
  }
  onCheckOut(bookingId: number, roomNumber: number): void {
    this.hotelService.roomCheckOut(roomNumber).subscribe();
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status == 'reserved') {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: `customer ${booking.reserve.name} belum melakukan check-in`,
          });
        } else {
          this.hotelService.checkOut(bookingId).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: `customer ${booking.reserve.name} berhasil melakukan check-out dari kamar ${booking.roomNumber}`,
          });
        }
      },
    });
  }
  onDeleteReservation(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status != 'checked-out') {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: `customer ${booking.reserve.name} belum bisa dihapus karena belum melakukan check-out`,
          });
        } else {
          Swal.fire({
            title: 'Apakah anda yakin menghapus data ini?',
            text: 'Data tidak akan bisa dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: `customer ${booking.reserve.name} berhasil dihapus`,
              });
              this.hotelService.remove(bookingId).subscribe();
            }
          });
        }
      },
    });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.hotelService.list().subscribe({
      next: (bookings: Book[]) => {
        this.bookings = bookings;
      },
    });
  }
}
