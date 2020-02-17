import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = null;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor() {
    const email = sessionStorage.getItem('email');
    this.currentUser = email ? email : null;
  }

  login(email: string, password: string) {
    sessionStorage.setItem('email', email);
    this.currentUser = { email };

    // return of({ username }).pipe(
    //   tap((val) => {
    //     if (!val) { return; }
    //     this.toastrService.show('Successfuly logged in!');
    //   })
    // ) // this.http.post('https://my-domain.com/api/loing', { username, password })
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('email');
  }
}
