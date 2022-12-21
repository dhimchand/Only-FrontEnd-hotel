import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import { StringFormatService } from './services/string-format.service';
import { SessionService } from './services/session.service';
import { BookingStatusPipe } from './pipes/booking-status.pipe';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ValidationMessageComponent, BookingStatusPipe, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ValidationMessageComponent, BookingStatusPipe],
  providers: [StringFormatService, SessionService]
})
export class SharedModule { }
