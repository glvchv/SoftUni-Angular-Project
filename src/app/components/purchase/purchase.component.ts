import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IWatch } from 'src/app/models/list-interface';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss', '../../../errors.scss']
})
export class PurchaseComponent implements OnInit {
  email: string = sessionStorage.getItem('email');
  id: string;
  watch: IWatch;
  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.getDetails(this.id).subscribe(data => {
      this.watch = data;
    })
  }
  purchaseWatch(value) {
    this.watch.bought = true;
    this.watch.buyerInfo = value;
    this.watch.buyerInfo['email'] = sessionStorage.getItem('email');
    this.watch.buyerInfo['date'] = new Date();
    this.listService.updateListing(this.watch, this.id);
    this.router.navigate(['']);
  }
}
