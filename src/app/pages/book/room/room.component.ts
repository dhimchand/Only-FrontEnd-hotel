import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TOKEN } from 'src/app/auth/model/auth.model';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { ROOM } from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private readonly sessionService: SessionService,
    private readonly hotelService: HotelService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.sessionService.get(TOKEN))
      this.router.navigateByUrl('/auth/login');
  }

  roomGroup : FormGroup = new FormGroup({
    number : new FormControl(null,[Validators.required]),
    status : new FormControl(true)
  })

  room : ROOM;

  onSubmitRoom() : void {
    const newRoom = this.roomGroup.value;
    this.hotelService.saveRoom(newRoom).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: `berhasil menambahkan kamar`,
        });
      },
    });

    this.router.navigateByUrl('backoffice/book')
  }
  isFormValid(field: string): boolean {
    const control: AbstractControl = this.roomGroup.get(
      field
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  

}
