import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TOKEN } from '../auth/model/auth.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  onSignedOut(): void {
    Swal.fire({
      title: 'Apakah anda yakin untuk Log-Out?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log Out',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Loged Out!', 'Berhasil Log Out', 'success');
        sessionStorage.removeItem(TOKEN);

        this.router.navigateByUrl('');
      }
    });
  }
}
