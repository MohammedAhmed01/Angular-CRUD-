import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeServiceService } from '../services/employee-service.service';
import { GlobalComponent } from '../global-componenet';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css'],
})
export class EmployeedashboardComponent implements OnInit {
  title = 'Angular14CRUD';
  getEmployeeData: any;
  mode: string = 'Dark Mode';
  href = '';

  constructor(
    public dialog: MatDialog,
    private service: EmployeeServiceService,
    private router: Router
  ) {}

  //Open dialog box (form)
  openDialog() {
    const dialogRef = this.dialog
      .open(DialogComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllEmployee();
        }
      });
  }
  ngOnInit() {
    this.getAllEmployee();
    if (GlobalComponent.LoggedInStatus) {
      this.router.navigate(['employee']);
    }
  }

  //Gets the data form service file
  getAllEmployee() {
    this.service.getEmployee().subscribe((res: any) => {
      this.getEmployeeData = res;
    });
  }

  //Edits the employees data
  editEmployee(employee: any) {
    this.dialog
      .open(DialogComponent, {
        width: '40%',
        data: employee,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllEmployee();
        }
      });
  }
  //Delete employees data
  deleteEmployee(id: number) {
    this.service.deleteEmploye(id).subscribe(() => {
      this.getAllEmployee();
    });
  }
  //Dark mode
  darkMode() {
    let body = document.querySelector('body');
    let container = document.querySelector('.container');
    let td = document.getElementById('tbody');
    let btn = document.getElementById('btnbg');
    btn?.classList.toggle('btnbg');
    td?.classList.toggle('tr');
    body?.classList.toggle('dark');
    container?.classList.toggle('table-bg');
    this.darkmodname();
  }
  //Dark mode name changer
  darkmodname() {
    if (this.mode == 'Dark Mode') {
      this.mode = 'Light Mode';
    } else {
      this.mode = 'Dark Mode';
    }
  }
  //Logout
  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    window.location.reload();
  }
}
