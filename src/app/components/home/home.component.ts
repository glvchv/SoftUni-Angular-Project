import { Component, OnInit } from '@angular/core';
import { IWatch } from '../../models/list-interface';
import { ListService } from '../../services/list.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  watches: IWatch[];

  constructor(private listService: ListService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.listService.getList().subscribe(data => {
      console.log(data);
      this.watches = data;
      this.watches.forEach(watch => {
        watch.description = watch.description.substring(0, 30);
      })
    })


  }

  get isLogged() {
    return this.userService.isLogged;
  }

}

