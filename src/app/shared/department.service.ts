import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import * as _ from 'lodash';

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

  getDepartmentName($key) {
    if ($key == '0') return '';
    else {
      return _.find(this.array, (obj) => {
        return obj.$key == $key;
      })['name'];
    }
  }
}
