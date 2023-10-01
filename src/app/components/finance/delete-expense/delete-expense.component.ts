import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Objects';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.css']
})
export class DeleteExpenseComponent implements OnInit {
  categories = Category;
  expense !: Expense;

  constructor(@Inject(MAT_DIALOG_DATA) private data : Expense, private matDialogRef : MatDialogRef<DeleteExpenseComponent>,
    private toaster : ToastrService, private expenseService : ExpenseService) {}
  
  ngOnInit(): void {
    this.expense = this.data;
  }

  cancel(){
    this.matDialogRef.close(false);
  }

  delete(){
    this.expenseService.delete(this.expense.id).subscribe({
      next : (value) =>{
        if (value) {
          this.toaster.success('Deleted successfully.','Successed');
          this.matDialogRef.close(true);
        }
        else{
          this.toaster.error('Unable to delete.','Failed');
        }
      }
    });
  }
}
