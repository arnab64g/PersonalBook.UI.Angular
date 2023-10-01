import { Component, OnInit, Inject } from '@angular/core';
import { Grade } from 'src/app/models/Education';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GradeService } from 'src/services/grade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-grade-popup',
  templateUrl: './delete-grade-popup.component.html',
  styleUrls: ['./delete-grade-popup.component.css']
})
export class DeleteGradePopupComponent implements OnInit{
  grade !: Grade;

  constructor(@Inject(MAT_DIALOG_DATA) private data : Grade, private matDialogRef : MatDialogRef<DeleteGradePopupComponent>,
    private gradeService : GradeService, private toaster : ToastrService) {}
  
  ngOnInit(): void {
    this.grade=this.data;  
  }

  deleteGrade(){
    this.gradeService.deleteGrade(this.grade.id).subscribe({
      next : (value) => {
          if (value) {
            this.toaster.success('Deleted successfully.', 'Successed');
            this.matDialogRef.close(true);
          }
          else{
            this.toaster.error('Unable to delete', 'Failed');
          }
      }
    });
  }

  cancel(){
    this.matDialogRef.close(false);
  }
}
