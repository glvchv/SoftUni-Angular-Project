import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../../errors.scss']
})
export class RegisterComponent implements OnInit {

  // nameRegex = new RegExp('^[A-Z]{1}[a-z]{2,}$', 'g');
  // emailRegex = new RegExp('[\w.-_]+@[\w]+.[a-z]+', 'g');
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  register(value) {
    this.userService.registerUser(value);
  }
}
