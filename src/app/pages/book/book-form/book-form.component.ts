import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TOKEN } from 'src/app/auth/model/auth.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.util';
import Swal from 'sweetalert2';
import { IBookFormComponent } from '../model/book-component.model';
import {
  Book,
  GUESTCOUNT,
  ROOM,
  roomava,
  ROOMNUMBER,
} from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit, IBookFormComponent {
  constructor(
    private readonly sessionService: SessionService,
    private readonly hotelService: HotelService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  booking?: Book;

  guestCountOption = GUESTCOUNT;
  rooms: ROOM[] = [];
  roomsAvailable: ROOM[] = [];

  // checkRoom() {
  //   this.roomNumberOption.forEach(element => {
  //     if (element.status == true) {
  //       this.roomNumberTrue.push(element)
  //     }
  //   });
  // }

  nightlyFee: number = NIGHTLY_FEE;
  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    roomNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    duration: new FormControl(null, [Validators.required, Validators.min(1)]),
    guestCount: new FormControl(null, [Validators.required, Validators.min(1)]),
    status: new FormControl('reserved'),
    reserve: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]),
    }),
  });

  onSubmitReservation(): void {
    const payload = this.bookingGroup.value;
    const { reserve, roomNumber, duration } = payload;
    const totalPrice = duration * NIGHTLY_FEE;
    const viewedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    Swal.fire({
      title: 'Apakah data yang dimasukkan sudah benar?',
      text: 'Anda bisa melakukan edit data sebelum tamu melakukan check-in',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Benar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.roomReserved(roomNumber).subscribe();
        this.hotelService.save(payload).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: `Tamu ${
                reserve.name
              } telah melakukan pemesanan untuk kamar ${roomNumber} selama ${duration} malam dengan total tagihan sebesar ${viewedPrice.format(
                totalPrice
              )}.`,
            });
          },
        });
        this.router.navigateByUrl('backoffice/book');
      }
    });
  }
  onFormReset(): void {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params;
        if (id) {
          this.hotelService.get(+id).subscribe({
            next: (booking: Book) => {
              this.booking = booking;
              this.setFormValue(this.booking);
            },
          });
        }
      },
    });
    this.onLoadData();
    this.rooms.forEach((element) => {
      if (element.status == true) {
        this.roomsAvailable.push(element);
      }
    });

    if (!this.sessionService.get(TOKEN))
      this.router.navigateByUrl('/auth/login');
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.bookingGroup.get(
      field
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  setFormValue(book: Book): void {
    if (book) {
      const { id, reserve, guestCount, duration, roomNumber } = book;
      this.bookingGroup.get(['id'])?.setValue(id);
      this.bookingGroup.get(['reserve', 'name'])?.setValue(reserve.name);
      this.bookingGroup.get(['reserve', 'email'])?.setValue(reserve.email);
      this.bookingGroup.get(['reserve', 'phone'])?.setValue(reserve.phone);
      this.bookingGroup.get(['guestCount'])?.setValue(guestCount);
      this.bookingGroup.get(['roomNumber'])?.setValue(roomNumber);
      this.bookingGroup.get(['duration'])?.setValue(duration);
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onLoadData(): void {
    this.hotelService.listRoom().subscribe({
      next: (rooms: ROOM[]) => {
        this.rooms = rooms;
      },
    });
  }
}
