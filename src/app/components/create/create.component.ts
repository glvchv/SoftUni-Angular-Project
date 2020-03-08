import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { IWatch } from 'src/app/models/list-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../errors.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private listService: ListService, private router: Router) {
    this.form = this.fb.group({
      model: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(10)]],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postOffer(value: IWatch) {
    value.creator = sessionStorage.getItem('email');
    value.date = new Date();
    value.bought = false;
    value.buyerInfo = {};
    this.listService.postWatch(value);
    this.router.navigate(['']);
    console.log(value);
  }
}