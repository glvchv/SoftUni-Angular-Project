import { Injectable, Query } from '@angular/core';
import { IWatch } from '../models/list-interface';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { resolve } from 'url';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  watchCollection: AngularFirestoreCollection<IWatch>;
  list: Observable<IWatch[]>;
  watchDetails: IWatch;

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
    this.watchCollection = this.afs.collection('listings', ref => ref.orderBy('date', 'desc'));
    this.list = this.watchCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IWatch;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getList() {
    return this.list;
  }

  postWatch(watch: IWatch) {
    this.watchCollection.add({...watch})
    .then((result) => {
      this.toastr.success('Successfully posted!')
    })
    .catch((error) => {
      this.toastr.error(error);
    })
  }

  getDetails(id: string) {
    return this.watchCollection.doc<IWatch>(`/${id}`).valueChanges()
  }

  updateListing(watch: IWatch, id) {
    this.afs.doc(`listings/${id}`).update(watch)
    .then((result) => {
      this.toastr.success('Successfully updated!')
    })
    .catch((error) => {
      this.toastr.error(error);
    })
  }

  deleteListing(id) {
    this.afs.doc(`listings/${id}`).delete()
    .then((result) => {
      this.toastr.success('Successfully deleted!');
    })
    .catch((error) => {
      this.toastr.error(error);
    })
  }

  
}
