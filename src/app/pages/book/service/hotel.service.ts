import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Book, HOTEL, ROOM, roomava, ROOMNUMBER } from '../model/book.model';
import { IHotelService, IRoomService } from './Ihotel.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService implements IHotelService, IRoomService {
  constructor(private readonly sessionService: SessionService) {}

  rooms: ROOM[] = [];
  saveRoom(room: ROOM): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        room.status = true;
        this.rooms.push(room);
        observer.next();

        this.setToStorageRoom();
      } catch (error) {
        observer.error(error.message);
      }
    });
  }
  listRoom(): Observable<ROOM[]> {
    return new Observable<ROOM[]>((observer: Observer<ROOM[]>) => {
      try {
        const sessionRooms: string = this.sessionService.get(
          'roomAvailable'
        ) as string;
        if (!sessionRooms) {
          this.rooms = [];
        } else {
          this.rooms = JSON.parse(sessionRooms);
        }
        this.setToStorageRoom();
        return observer.next(this.rooms);
      } catch (error) {
        return observer.error(error.message);
      }
    });
  }
  bookings: Book[] = [];

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      try {
        const sessionBooks: string = this.sessionService.get(HOTEL) as string;
        if (!sessionBooks) {
          this.bookings = [];
        } else {
          this.bookings = JSON.parse(sessionBooks);
        }
        this.setToStorage();
        return observer.next(this.bookings);
      } catch (error) {
        return observer.error(error.message);
      }
    });
  }
  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        const sessionBooks: string = this.sessionService.get(HOTEL) as string;
        if (sessionBooks) {
          const bookings: Book[] = JSON.parse(sessionBooks);
          const book: Book = bookings.find((b) => b.id === bookingId) as Book;
          observer.next(book);
        }
      } catch (error) {
        observer.error(error.message);
      }
    });
  }
  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (booking.id) {
          this.bookings = this.bookings.map((t) => {
            if (t.id === booking.id) {
              t = booking;
              return booking;
            }
          });
        } else {
          booking.id = Date.now();
          this.bookings.push(booking);
          observer.next();
        }
        this.setToStorage();
      } catch (error) {
        observer.error(error.message);
      }
    });
  }
  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.forEach((b) => {
          if (b.id === bookingId) {
            b.status = 'checked-in';
          }
          this.setToStorage();
          observer.next();
        });
      } catch (error) {
        observer.error(error.message);
      }
    });
  }
  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.forEach((b) => {
          if (b.id === bookingId) {
            b.status = 'checked-out';
          }
          this.setToStorage();
          observer.next();
        });
      } catch (error) {
        observer.error(error.message);
      }
    });
  }

  roomReserved(roomNumber: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.rooms.forEach((b) => {
          if (b.number == roomNumber) {
            b.status = false;
          }
          this.setToStorageRoom();
          observer.next();
        });
      } catch (error) {
        observer.error(error.message);
      }
    });
  }

  roomCheckOut(roomNumber: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.rooms.forEach((r) => {
          if (r.number == roomNumber) {
            r.status = true;
          }
          this.setToStorageRoom();
          observer.next();
        });
      } catch (error) {
        observer.error(error.message);
      }
    });
  }

  remove(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].id === bookingId) {
            if (this.bookings[index].status === 'checked-out') {
              this.bookings.splice(index, 1);
            }
          }
        }
        this.setToStorage();
        observer.next();
      } catch (error) {
        observer.error(error.message);
      }
    });
  }
  private setToStorage(): void {
    this.sessionService.set(HOTEL, JSON.stringify(this.bookings));
  }

  private setToStorageRoom(): void {
    this.sessionService.set('roomAvailable', JSON.stringify(this.rooms));
  }

  // private setRoomAvailableStorage(): void {
  //   this.sessionService.set('availableRoom', JSON.stringify(this.roomNumberOption))
  // }

  // changeRoomStatus(roomNumber: number): Observable<void> {
  //   return new Observable<void>((observer: Observer<void>) => {
  //     try {
  //       this.roomNumberOption.forEach((b) => {
  //         if (b.number === roomNumber) {
  //           b.status = false;
  //         }
  //         this.roomNumberOption.forEach((t) =>{
  //           if (t.status == true) {
  //             this.availableRoom.push(t)
  //           }
  //         })
  //       });
  //     } catch (error) {
  //       observer.error(error.message);
  //     }
  //   });
  // }
}
