import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SecondaryResult, SecondaryResultTable } from 'src/app/models/Education';
import { SecondaryService } from 'src/services/secondary.service';

@Component({
  selector: 'app-delete-secondary-result',
  templateUrl: './delete-secondary-result.component.html',
  styleUrls: ['./delete-secondary-result.component.css']
})
export class DeleteSecondaryResultComponent implements OnInit {
  result !: SecondaryResultTable;

  constructor(@Inject(MAT_DIALOG_DATA) private data : SecondaryResultTable, private secondaryService : SecondaryService,
  private matDialogRef : MatDialogRef<DeleteSecondaryResultComponent>, private toaster : ToastrService) {}

  ngOnInit(): void {
    this.result = this.data;
  }

  cancel(){
    this.matDialogRef.close(false);
  }

  delete(){
    this.secondaryService.deleteResult(this.result.id).subscribe({
      next : (res) =>{
        if (res) {
          this.toaster.success('Deleted Successfully', 'Successed');
          this.matDialogRef.close(true);
        }
        else{
          this.toaster.error('Unable to delete.', 'Failed');
        }
      }
    })
  }

}
