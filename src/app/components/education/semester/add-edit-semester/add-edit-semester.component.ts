import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Semester } from 'src/app/models/Education';
import { Month } from 'src/app/models/Objects';
import { SemsterService } from 'src/services/semster.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-edit-semester',
  templateUrl: './add-edit-semester.component.html',
  styleUrls: ['./add-edit-semester.component.css']
})
export class AddEditSemesterComponent implements OnInit {
  semesterForm !: FormGroup;
  semester !: Semester;
  month = Month;

  constructor(private matDialogRef: MatDialogRef<AddEditSemesterComponent>, private formBuilder : FormBuilder, private toaster : ToastrService,
    private userService : UserService, private semesterService : SemsterService, @Inject(MAT_DIALOG_DATA) private data : Semester) {}

  ngOnInit(): void {
    this.semester = this.data;
    
    if (this.semester == null) {
      this.semester =  {
        id : 0,
        semesterName :'',
        userId : this.userService.getUserId(),
        monthBng : new Date().getMonth() + 1 ,
        year : new Date().getFullYear()
      }
    }

    this.semesterForm = this.formBuilder.group({
      name : [this.semester.semesterName, Validators.required],
      month : [this.semester.monthBng, Validators.required ],
      year : [this.semester.year, Validators.required]
    });
  }

  addEditSemester(){
    this.semester.semesterName = this.semesterForm.get('name')?.value;
    this.semester.monthBng = this.semesterForm.get('month')?.value ;
    this.semester.year = this.semesterForm.get('year')?.value;
    
    if (this.semester.id == 0) {
      this.semesterService.addSemester(this.semester).subscribe({
        next : (res) =>{
          if (res) {
            this.toaster.success('Added successfully', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Unable to add.', 'Failed');
          }
        }
      });
    }
    else{
      this.semesterService.editSemester(this.semester).subscribe({
        next : (res) =>{
          if (res) {
            this.toaster.success('Updated successfully', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Unable to update', 'Failed');
          }
        }
      })
    }
    
  }

  close(){
    this.matDialogRef.close(false);
  }
}
