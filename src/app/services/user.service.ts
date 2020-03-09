import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, from, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { IUser } from '../models/user-interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<IUser>;
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore, private toastr: ToastrService) {
    // ********* FIREBASE DOCUMENT WITH USER ID AND  USER DATA ********
    // this.user$ = this.afAuth.authState.pipe(switchMap(user => {
    //   if (user) {
    //     return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     return of(null)
    //   }
    // }))
  }
  get isAuth() {
    return this._isAuth;
  }

  initializeAuthState() {
    this.afAuth.authState.subscribe((userState) => {
      if (userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }

  loggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  registerUser(data) {

    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        this.toastr.success('You have register successfully!');
        this.router.navigate(['/user/login']);;
      }).catch((error) => {
        this.toastr.error(error);
      })
  }

  loginUser(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.toastr.success('You have logged in successfully!');
        sessionStorage.setItem('email', email);
        this.router.navigate(['']);
      }).catch((error) => {
        this.toastr.error(error);
      })
  }

  logout() {
    this.afAuth.auth.signOut()
      .then((result) => {
        sessionStorage.clear();
        this.toastr.success('You have logged out successfully!');
      })
      .catch((error) => {
        this.toastr.error(error);
      })

  }

  // return of({ username }).pipe(
  //   tap((val) => {
  //     if (!val) { return; }
  //     this.toastrService.show('Successfuly logged in!');
  //   })
  // ) // this.http.post('https://my-domain.com/api/loing', { username, password })


  //  ********** GOOGLE SIGN UP **********
  // async googleLogin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  // async logOut() {
  //   await this.afAuth.auth.signOut();
  //   return this.router.navigate(['']);
  // }

  // private updateUserData(user) {
  //   const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
  //   const data = {
  //     uid: user.uid,
  //     email: user.email
  //   }
  //   return userRef.set(data, { merge: true });
  // }


}
