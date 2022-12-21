import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Auth, TOKEN } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly sessionService: SessionService) { }
  login(payload: Auth): Observable<string | null> {
    return new Observable<string | null>((observer: Observer<string | null>) => {
      try {
        const { username, password } = payload;
        if (username === 'admin@gmail.com' && password === 'password') {
          const token = 'tokenbearerjwt'
          this.sessionService.set(TOKEN, JSON.stringify(token));
          observer.next(token);
        } else {
          observer.next(null);
        }
      } catch (error) {
        observer.error(error.message);
      }
    })
  }
}
