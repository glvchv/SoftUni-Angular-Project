import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { IWatch } from 'src/app/models/list-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  watch: IWatch;
  id: string;

  get isAuth() {
    if(this.watch) {
      if (this.watch.creator === sessionStorage.getItem('email')) {
        return true;
      } 
      return false;
    }
    
  }
  
  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.listService.getDetails(this.id).subscribe(data => {
      this.watch = data;
    })
    
  }

  deleteListing() {
    this.listService.deleteListing(this.id);
    this.router.navigate(['']);
  }
}
