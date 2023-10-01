import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Grade } from 'src/app/models/Education';
import { Scale } from 'src/app/models/Objects';
import { GradeService } from 'src/services/grade.service';

@Component({
  selector: 'app-add-edit-grade',
  templateUrl: './add-edit-grade.component.html',
  styleUrls: ['./add-edit-grade.component.css']
})
export class AddEditGradeComponent implements OnInit {
  grade !: Grade;
  gradeForm !: FormGroup;
  scale = Scale;

  constructor( private formBuilder : FormBuilder, private gradeService : GradeService, private matDialogRef : MatDialogRef<AddEditGradeComponent>,
    @Inject(MAT_DIALOG_DATA) private data : Grade, private toaster : ToastrService) {}

  ngOnInit(): void {
    this.grade = this.data;
    this.gradeForm = this.formBuilder.group({
      grade : [this.grade.gradeName, Validators.required],
      points:[this.grade.points, Validators.required],
      scale : [this.grade.scale, Validators.min(2)],
      maxNumber:[this.grade.maxNumber, Validators.required],
      minNumber:[this.grade.minNumber,Validators.required]
    });
  }

  addEditGrade(){
    this.grade = {
      id : this.data.id,
      gradeName : this.gradeForm.get('grade')?.value,
      points : this.gradeForm.get('points')?.value,
      scale : this.gradeForm.get('scale')?.value,
      maxNumber : this.gradeForm.get('maxNumber')?.value,
      minNumber : this.gradeForm.get('minNumber')?.value
    }
    if (!this.gradeForm.valid || this.grade.scale==0) {
      return;
    }
    if (this.grade.id == 0) {
      this.gradeService.addGrades(this.grade).subscribe({
        next : (res) => {
          if (res) {

            this.toaster.success('Grade added successfully.', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Failed to add grade.', 'Failed');
          }
        }
      });  
    }
    else{
      this.gradeService.editGrades(this.grade).subscribe({
        next : (res) => {
          if (res) {
            this.toaster.success('Grade updated successfully.', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Failed update grade.', 'Failed');
          }
        }
      }); 
    }
    
  }

  cancelAdd(){
    this.matDialogRef.close(false);
  }
}
