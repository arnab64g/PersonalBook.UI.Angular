import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/Education';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit{
  course !: Course;

  constructor(@Inject(MAT_DIALOG_DATA) private data : Course, private matDialogRef : MatDialogRef<DeleteCourseComponent>,
    private courseService : CourseService, private toaster : ToastrService) {}
  
  ngOnInit(): void {
    this.course = this.data
  }
  cancel(){
    this.matDialogRef.close(false);
  }

  delete(){
    this.courseService.deleteCourse(this.course.id).subscribe({
      next : (val) => {
        if (val) {
          this.toaster.success('Deleted Successfully.', 'Successed')
          this.matDialogRef.close(true);
        }
        else{
          this.toaster.error('Unable to delete', 'Failed');
        }
      }
    });
  }
}
