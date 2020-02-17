import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { IWatch } from 'src/app/shared/list-interface';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.listService.getDetails(this.id).subscribe(data => {
      this.watch = data;
    })
    
  }

  get isAuth() {
    return true;
  }
}
