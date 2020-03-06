import { Component, OnInit } from '@angular/core';
import { IWatch } from 'src/app/models/list-interface';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  posts$;
  email: string;
  constructor(private listService: ListService) {
    this.email = sessionStorage.getItem('email')
   }

  ngOnInit() {
    this.listService.getList().subscribe(data => {
      this.posts$ = data.filter(post => post.creator === this.email);
    })
  }

}
