import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCredentails: firebase.auth.UserCredential;
  private connectedUser: User;

  constructor(private auth: AngularFireAuth) {}

  get user() {
    return this.connectedUser;
  }

  async signUp() {
    const newUserCredentails = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (newUserCredentails.additionalUserInfo.isNewUser) {
      newUserCredentails.user.sendEmailVerification();
    }
    this.auth.signOut();
  }

  removeUser() {
    this.userCredentails.user.delete();
  }

  async login() {
    this.userCredentails = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.userCredentails.user.sendEmailVerification();
    this.connectedUser = {
      id: this.userCredentails.user.uid,
      email: this.userCredentails.user.email,
      name: this.userCredentails.user.displayName
    };
  }

  logout() {
    this.auth.signOut();
    this.connectedUser = undefined;
  }

  
}