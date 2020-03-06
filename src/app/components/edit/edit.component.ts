import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IWatch } from 'src/app/models/list-interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../../errors.scss']
})
export class EditComponent implements OnInit {
  placeholderData: IWatch;
  form: FormGroup;
  id: string;

  constructor(private route: ActivatedRoute, private listService: ListService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      model: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(10)]],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.getDetails(this.id).subscribe(data => {
      this.placeholderData = data;
    });

  }

  updateListing(watch: IWatch) {
    this.listService.updateListing(watch, this.id);
    this.router.navigate([`/details/${this.id}`]);
  }

}
