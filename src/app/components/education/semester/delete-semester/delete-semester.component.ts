import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Semester } from 'src/app/models/Education';
import { Month } from 'src/app/models/Objects';
import { SemsterService } from 'src/services/semster.service';

@Component({
  selector: 'app-delete-semester',
  templateUrl: './delete-semester.component.html',
  styleUrls: ['./delete-semester.component.css']
})
export class DeleteSemesterComponent implements OnInit {
  semester !: Semester;
  month = Month;
  /**
   *
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data : Semester, private matDialogRef : MatDialogRef<DeleteSemesterComponent>,
  private semesterService : SemsterService, private toaster : ToastrService) {}

  ngOnInit(): void {
    this.semester = this.data;
  }

  cancel() {
    this.matDialogRef.close(false);
  }

  delete(){
    this.semesterService.deleteSemester(this.semester.id).subscribe({
      next : (res) => {
        if (res != 0) {
          this.toaster.success("Deleted Successfully", 'Successed');
          this.matDialogRef.close(true);
        }
        else{
          this.toaster.error('Unable to delete', 'Failed')
        }
      }
    });
  }
}
