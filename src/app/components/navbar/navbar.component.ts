import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get isLogged() { 
    console.log(this.userService.isLogged);
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  logoutHandler() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
