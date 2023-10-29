import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Objects';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.css']
})

export class AddEditExpenseComponent implements OnInit {
  categories = Category;
  expenseForm !: FormGroup;
  expense !: Expense;

  constructor(@Inject(MAT_DIALOG_DATA) private data : Expense, private formBuilder : FormBuilder, private expenseService : ExpenseService,
    private dialogRef : MatDialogRef<AddEditExpenseComponent>, private toaster : ToastrService) {}
  
  ngOnInit(): void {
    this.expense = this.data
    this.expenseForm = this.formBuilder.group({
      category : [this.expense.category, Validators.min(1)],
      date : [this.expense.date],
      amount : [this.expense.amount],
      description : [this.expense.description]
    });  
  }

  addEditExpense(){
    this.expense.category = this.expenseForm.get('category')?.value;
    this.expense.date = this.expenseForm.get('date')?.value;
    this.expense.amount = this.expenseForm.get('amount')?.value;
    this.expense.description = this.expenseForm.get('description')?.value;
    this.expense.date.setDate(this.expense.date.getDate());
	
    if (this.expenseForm.valid) {
      if (this.expense.id == 0) {
        this.expenseService.post(this.expense).subscribe({
          next : (value) => {
            if (value) {
              this.dialogRef.close(true);
              this.toaster.success('Added successfully.','Successed');
            }
            else{
              this.toaster.error('Unable to add', 'Failed');
            }
          }
        })
      }
      else {
        this.expenseService.put(this.expense).subscribe({
          next : (value) =>{
            if (value) {
              this.toaster.success('Updated Successfully', 'Successed');
              this.dialogRef.close(true);
            }
            else{
              this.toaster.error('Update failed', 'Failed');
            }
          }
        });
      }
    }
    else{
      console.log(this.expenseForm.hasError);
    }
  }
  
  close(){
    this.dialogRef.close(false);
  }

  isDisabled(id : number) : boolean{
    if (id == 0) {
      return true;
    }
    else{
      return false;
    }
  }
}
