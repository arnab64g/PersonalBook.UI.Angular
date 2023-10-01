import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResultListItem } from 'src/app/models/Education';
import { ResultService } from 'src/services/result.service';

@Component({
  selector: 'app-delete-result',
  templateUrl: './delete-result.component.html',
  styleUrls: ['./delete-result.component.css']
})
export class DeleteResultComponent implements OnInit{
  result !: ResultListItem;

  constructor(@Inject(MAT_DIALOG_DATA) private data : ResultListItem, private resultService : ResultService,
   private matDialogRef : MatDialogRef<DeleteResultComponent>, private toaster : ToastrService ) {}
  
  ngOnInit(): void {
    this.result = this.data;
    console.log(this.result);
  }

  cancel(){
    this.matDialogRef.close(false);
  }
  
  delete(){
    this.resultService.deleteResults(this.result.id).subscribe({
      next : (value) => {
        if (value) {
          this.toaster.success('Deleted Successfully', 'Successed');
          this.matDialogRef.close();
        }
        else{
          this.toaster.error('Unable to delete', 'Failed');
        }
      }
    })
  }
}
