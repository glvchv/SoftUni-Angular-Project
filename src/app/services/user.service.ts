import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/user-interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<IUser>;
  currentUser = null;
  logged: boolean;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null)
      }
    }))
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

  registerUser(data) {

    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        this.router.navigate(['/user/login']);;
        console.log(result.user)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  loginUser(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        this.currentUser = result.user.email;
        this.router.navigate(['']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.currentUser = null;
    sessionStorage.clear();
  }
}
