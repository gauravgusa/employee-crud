import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/shared/department.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';

//import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    private departmentService: DepartmentService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  array: any[] = [];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'city',
    'departmentName',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getEmployees().subscribe((list) => {
      this.array = list.map((item) => {
        let departmentName = this.departmentService.getDepartmentName(
          item.payload.val()['department']
        );
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val(),
        };
      });
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return (
            ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
          );
        });
      };

      //new ngxCsv(this.array, 'Employee Report');
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    //we have to populate data from row, corresonding employee details
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record'))
      this.service.DeleteEmployee($key);
    this.notificationService.warn('! Deleted Successfully');
  }

  // filedownload() {
  //   var options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: 'Report Data',
  //     useBom: true,
  //     noDownload: true,
  //     headers: ['fullName', 'email', 'mobile', 'city'],
  //   };

  //   new ngxCsv(this.array, 'Employee_Report', options);
  // }
}
