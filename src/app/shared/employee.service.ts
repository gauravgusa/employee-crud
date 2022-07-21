import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeList } from '../models/employee-list.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeListRef: AngularFireList<any>;
  employeeRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeListRef = this.db.list('employees');
    return this.employeeListRef.snapshotChanges();
  }

  getEmployee($key: string) {
    this.employeeRef = this.db.object('employees/' + $key);
    return this.employeeRef;
  }

  insertEmployee(employee: EmployeeList) {
    this.employeeListRef.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate,
      isPermanent: employee.isPermanent,
    });
  }

  updateEmployee(employee: EmployeeList) {
    this.employeeListRef.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate,
      isPermanent: employee.isPermanent,
    });
  }

  // Delete Student Object
  DeleteEmployee($key: string) {
    this.employeeRef = this.db.object('employees/' + $key);
    this.employeeRef.remove();
  }
}
