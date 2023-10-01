import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/Education';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  courseForm !: FormGroup;
  course !: Course;

  constructor(private formBuilder : FormBuilder, private matDialogRef : MatDialogRef<AddEditCourseComponent>, 
    @Inject(MAT_DIALOG_DATA) private data : Course, private courseService : CourseService, private toaster : ToastrService) {}
  
  ngOnInit(): void {
    this.course = this.data;
    this.courseForm = this.formBuilder.group({
      code : [this.course.courseCode, Validators.required],
      title : [this.course.courseTitle, Validators.required],
      credit : [this.course.creditPoint, Validators.required]
    })
  }

  addEdit(){
    this.course.courseCode = this.courseForm.get('code')?.value;
    this.course.courseTitle = this.courseForm.get('title')?.value;
    this.course.creditPoint = this.courseForm.get('credit')?.value;

    if(this.course.id == 0){
      this.courseService.postCourse(this.course).subscribe({
        next : (res) =>{
          if (res != 0 ) {
            this.toaster.success('Added Successfully.', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Unable to add', 'Failed');
          }
        }
      });
    }
    else{
      this.courseService.putCourse(this.course).subscribe({
        next : (res) =>{
          if (res != 0 ) {
            this.toaster.success('Updated Successfully.', 'Sussessed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Update failed', 'Failed');
          }
        }
      });
    }
  }

  cancel(){
    this.matDialogRef.close(false);
  }
}
