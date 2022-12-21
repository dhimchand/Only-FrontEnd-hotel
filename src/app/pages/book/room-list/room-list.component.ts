import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  hotelService: any;

  constructor() { }

  ngOnInit(): void {
  }

  // onLoadData(): void {
  //   this.hotelService.list().subscribe({
  //     next: (bookings: Book[]) => {
  //       this.bookings = bookings;
  //     },
  //   });
  // }

}
