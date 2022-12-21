import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  formLogin: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit(): void { }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const payload = this.formLogin.value;
    this.authService.login(payload).subscribe({
      next: (token: string | null) => {
        if (token) {
          this.router.navigateByUrl('backoffice');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah',
          });
        }
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.formLogin.get(field) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }
}
