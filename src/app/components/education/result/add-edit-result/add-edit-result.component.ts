import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { sortCourses, sortGrade, sortSemester } from 'src/app/extralib/sort';
import { Result } from 'src/app/models/Education';
import { DropDownItem } from 'src/app/models/viewmodel';
import { CourseService } from 'src/services/course.service';
import { GradeService } from 'src/services/grade.service';
import { ResultService } from 'src/services/result.service';
import { SemsterService } from 'src/services/semster.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-edit-result',
  templateUrl: './add-edit-result.component.html',
  styleUrls: ['./add-edit-result.component.css']
})
export class AddEditResultComponent implements OnInit{
  grades !: Array<DropDownItem>;
  semesters !: DropDownItem[];
  courses !: DropDownItem[];
  dd !: DropDownItem;
  userId !: string;
  result !: Result;
  resultFrom !: FormGroup;

  constructor(private gradeService : GradeService, private semesterServive : SemsterService, private fromBuilder : FormBuilder,
    private courseService : CourseService, private userService : UserService, @Inject(MAT_DIALOG_DATA) private data : Result,
    private resultService : ResultService, private matDialogRef : MatDialogRef<AddEditResultComponent>, private toaster : ToastrService) { }

  ngOnInit(): void {
    this.result = this.data;
    this.userId = this.userService.getUserId();

    if (this.result == null) {
      this.result = ({
        id : 0,
        userId : this.userId,
        courseId : null,
        semesterId : null,
        gradeId : null
      });
    }
    else{
      this.result = this.data;
    }

    this.gradeService.getGrades().subscribe({
      next : (value) => {
        this.grades = sortGrade(value.filter(g => g.scale == 4)).map(g => ({id : g.id, name : g.gradeName}));
      }
    });

    this.semesterServive.getSemesterList(this.userId).subscribe({
      next : (value) =>{
        this.semesters = sortSemester(value).map(s => ({id : s.id, name: `${s.semesterName} ${s.year}`}));
      }
    });

    this.courseService.getCourses(this.userId).subscribe({
      next : (value) => {
        this.courses = sortCourses(value).map(c => ({id : c.id, name: c.courseCode}));
      }
    });
    this.resultFrom = this.fromBuilder.group({
      course : [this.result.courseId, Validators.required],
      semester : [this.result.semesterId, Validators.required],
      grade : [this.result.gradeId, Validators.required]
    });
  }

  cancel(){
    this.matDialogRef.close(false);
  }

  save(){
    if(this.resultFrom.valid){
      this.result.courseId = this.resultFrom.get('course')?.value;
      this.result.semesterId  = this.resultFrom.get('semester')?.value;
      this.result.gradeId  = this.resultFrom.get('grade')?.value;
      if (this.result.id == 0) {
        this.resultService.postResult(this.result).subscribe({
          next : (res) => {
            if (res) {
              this.toaster.success('Result added successfully', 'Successed');
              this.matDialogRef.close(true);
            }
            else{
              this.toaster.error('Unable to add.', 'Failed');
            }
          }
        });
      }
      else{
        this.resultService.putResult(this.result).subscribe({
          next : (res) => {
            if (res) {
              this.toaster.success('Result Updated successfully', 'Successed');
              this.matDialogRef.close(true);
            }
            else{
              this.toaster.error('Unable to update.', 'Failed');
            }
          }
        });
      }
      
    }
  }
}
