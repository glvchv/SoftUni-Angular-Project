import { Injectable } from '@angular/core';
import { IWatch } from '../shared/list-interface';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  watchCollection: AngularFirestoreCollection<IWatch>;
  list: Observable<IWatch[]>;
  watchDetails: IWatch;

  constructor(private afs: AngularFirestore) {
    this.watchCollection = this.afs.collection('listings');

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
    this.watchCollection.add({...watch});
  }

  getDetails(id: string) {
    return this.watchCollection.doc<IWatch>(`/${id}`).valueChanges()
  }
}
