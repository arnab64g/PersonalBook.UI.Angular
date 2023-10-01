import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { sortGrade } from 'src/app/extralib/sort';
import { Grade, SecondaryResult } from 'src/app/models/Education';
import { GradeService } from 'src/services/grade.service';
import { SecondaryService } from 'src/services/secondary.service';

@Component({
  selector: 'app-add-edit-secondary-result',
  templateUrl: './add-edit-secondary-result.component.html',
  styleUrls: ['./add-edit-secondary-result.component.css']
})

export class AddEditSecondaryResultComponent implements OnInit {
  result !: SecondaryResult;
  resultForm !: FormGroup;
  grades !: Grade[];
  title !: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data : SecondaryResult, private gradeService : GradeService, private toaster : ToastrService,
    private formBuilder : FormBuilder, private matDialogRef : MatDialogRef<AddEditSecondaryResultComponent>,
    private secondaryService : SecondaryService) {  }
  
  ngOnInit(): void {
    this.result = this.data;
    if (this.data.level == 10) {
      this.title = 'SSC';
    }
    else if (this.data.level == 12){
      this.title = 'HSC';
    }
    
    this.gradeService.getGrades().subscribe({
      next : (value) =>{
        this.grades = sortGrade(value).filter(g => g.scale==5);
      }
    });

    this.resultForm=this.formBuilder.group({
      sl : [this.data.sl, Validators.min(1)],
      subject : [this.data.subject, Validators.required],
      isOptional : [this.data.isOptional],
      grade : [this.data.gradeId, Validators.required],
    });
  }

  addEditResult(){
    this.result.sl = this.resultForm.get('sl')?.value;
    this.result.subject = this.resultForm.get('subject')?.value;
    this.result.gradeId = this.resultForm.get('grade')?.value;
    this.result.isOptional = Number(this.resultForm.get('isOptional')?.value);
    
    if(!this.resultForm.valid){
      return;
    }

    if (this.result.id == 0) {
      this.secondaryService.addResult(this.result).subscribe({
        next : (res) => {
          console.log(res);
          if (res) {
            if (res) {
              this.toaster.success('Result added successfully', 'Successed');
              this.matDialogRef.close(true);
            }
          }
        }
      });
    }
    else{
      this.secondaryService.updateResult(this.result).subscribe({
        next : (res) => {
          console.log(res);
          if (res) {
            this.toaster.success('Result updated successfully', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Result updated failed', 'Failed');
          }
        }
      });
    }
  }

  cancel(){
    this.matDialogRef.close(false);
  }
}
