import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  array: any[] = [];
  //array: Array[];

  constructor(private db: AngularFireDatabase) {
    this.departmentList = this.db.list('departments');

    this.departmentList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }
}
