import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmployeeComponent>,
    public service: EmployeeService,
    public departmentService: DepartmentService,
    public notificationService: NotificationService
  ) {}

  // departments = [
  //   { id: 3, valud: 'Dep 1' },
  //   { id: 2, valud: 'Dep 2' },
  //   { id: 1, valud: 'Dep 3' },
  // ];

  ngOnInit(): void {
    this.service.getEmployees();
    //console.log(this.departmentService.array);
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Successfully Cleared');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else this.service.updateEmployee(this.service.form.value);

      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submited successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
