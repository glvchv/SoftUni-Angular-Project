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
  purchased: IWatch[];
  hasSold: boolean;
  constructor(private listService: ListService) {
    this.email = sessionStorage.getItem('email')
  }

  ngOnInit() {
    this.listService.getList().subscribe(data => {
      this.posts$ = data.filter(post => post.creator === this.email);
      this.purchased = this.posts$.filter(post => post.bought === true);
      if (this.purchased.length > 0) {
        this.hasSold = true;
      } else {
        this.hasSold = false;
      }
    })
  }

  show(id: string) {
    return document.getElementById(id).style.display === 'none' ?
      document.getElementById(id).style.display = 'block' :
      document.getElementById(id).style.display = 'none'
  }

}
