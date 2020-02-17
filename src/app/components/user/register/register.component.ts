import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../../errors.scss']
})
export class RegisterComponent implements OnInit {

  // nameRegex = new RegExp('^[A-Z]{1}[a-z]{2,}$', 'g');
  // emailRegex = new RegExp('[\w.-_]+@[\w]+.[a-z]+', 'g');

  constructor() { }

  ngOnInit() {
  }

}
