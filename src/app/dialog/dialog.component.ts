import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../services/employee-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private build: FormBuilder,
    private service: EmployeeServiceService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  employeeForm!: FormGroup;
  actionBtn: string = 'save';
  //Reactive form and Validators
  ngOnInit(): void {
    this.employeeForm = this.build.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      joinDate: ['', Validators.required],
      jobRole: ['', Validators.required],
      salary: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'update';
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phoneNumber'].setValue(
        this.editData.phoneNumber
      );
      this.employeeForm.controls['joinDate'].setValue(this.editData.joinDate);
      this.employeeForm.controls['jobRole'].setValue(this.editData.jobRole);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
    }
  }
  //Add new employee
  addEmployee() {
    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.service.postEmployee(this.employeeForm.value).subscribe(() => {
          this.dialogRef.close('save');
        });
      }
    } else {
      this.updateEmployee();
    }
  }

  // Update the employee data (edit)
  updateEmployee() {
    this.service
      .putEmployee(this.employeeForm.value, this.editData.id)
      .subscribe(() => {
        this.employeeForm.reset();
        this.dialogRef.close('update');
      });
  }
}
