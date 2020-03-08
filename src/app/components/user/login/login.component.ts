import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../../errors.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
 };

  emailRegex = new RegExp('[a-zA-Z0-9.-_]{6,}@gmail\.com');

  constructor(
    private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {

  }

  login() {
    this.userService.loginUser(this.user.email, this.user.password);
  }

}
