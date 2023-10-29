import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { AddEditExpenseComponent } from '../add-edit-expense/add-edit-expense.component';
import { UserService } from 'src/services/user.service';
import { ExpenseService } from 'src/services/expense.service';
import { orderByExoenseHtoL, orderByExoenseLtoH, orderByExoenseNtoO, orderByExoenseOtoN, orderByExpenseCategory, sortByDateDesc } from 'src/app/extralib/sort';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { Category, ExpenseSort } from 'src/app/models/Objects';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {
  expenseSort = ExpenseSort;
  sortBy : number = 1;
  fromDate !: Date;
  toDate !: Date;
  length = 20;
  pageSize = 20;
  categories = Category;
  selected : number[] = [];
  expense !: Expense;
  expenses !: Expense[];
  expenseFilterde !: Expense[];
  expenseSlice !: Expense[];
  startIndex = 0;
  endIndex = this.startIndex + this.pageSize;

  constructor(private matDialod : MatDialog, private userService : UserService, private expenseService : ExpenseService) {  }
  
  ngOnInit(): void {
    this.expenseService.get(this.userService.getUserId()).subscribe({
      next : (value) => {
        value.forEach(element => {
          element.date = new Date(element.date);
        });

        this.expenses = sortByDateDesc(value);
        this.sortByChange(this.sortBy);
      }
    });
  }

  addExpense(){
    this.expense = {
      id:0,
      userId : this.userService.getUserId(),
      category : 0, 
      amount : 0,
      description : '',
      date : new Date(),
    }

    const add = this.matDialod.open(AddEditExpenseComponent, {data:this.expense});
    add.afterClosed().subscribe({
      next : (value) =>{
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }
 
  categoryFilter(event : any){
    this.selected = event;
    this.expenseFilterde = this.filterExpenses(this.expenses, this.fromDate, this.toDate, this.selected);
    this.expenseSlice = this.expenseFilterde.slice(this. startIndex, this.endIndex);
  }

  fromDateChange(event : any){
    this.fromDate = event.value;
    this.expenseFilterde = this.filterExpenses(this.expenses, this.fromDate, this.toDate, this.selected);
    this.expenseSlice = this.expenseFilterde.slice(this. startIndex, this.endIndex);
  }

  toDateChange(event : any){
    this.toDate = event.value;
    this.expenseFilterde = this.filterExpenses(this.expenses, this.fromDate, this.toDate, this.selected);
    this.expenseSlice = this.expenseFilterde.slice(this. startIndex, this.endIndex);
  }

  onPageChange(event : any){
    this.pageSize = event.pageSize;
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex  = this.startIndex + this.pageSize;
    this.expenseSlice = this.expenseFilterde.slice(this. startIndex, this.endIndex);
  }

  filterExpenses(expenses: Expense[], fromDate : Date, toDate : Date, categories : number[]) : Expense[]{
    
    let filtered = expenses;
    const cset = new Set(categories);
    
    if (cset.size != 0) {
      filtered = filtered.filter(e => cset.has(e.category));
    }

    if (fromDate) {
      filtered = filtered.filter(e => e.date.getTime() >= fromDate.getTime());
    }
    
    if (toDate) {
      filtered = filtered.filter(e => e.date.getTime() <= toDate.getTime());
    }

    return filtered;
  }

  edit(id : number){
    this.expense = this.expenses.filter(e => e.id == id)[0];
    const edit = this.matDialod.open(AddEditExpenseComponent, {data: this.expense});
    edit.afterClosed().subscribe({
      next : (value) => {
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  delete(id : number){
    this.expense = this.expenses.filter(e => e.id == id)[0];
    const edit = this.matDialod.open(DeleteExpenseComponent, {data: this.expense});
    edit.afterClosed().subscribe({
      next : (value) => {
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  isDisabled(id : number) : boolean{
    if (id == 0) {
      return true;
    }
    else{
      return false;
    }
  }

  sortByChange(event : any){
    this.sortBy = event;
    
    switch(this.sortBy){
      case 1:
        this.expenses = orderByExoenseNtoO(this.expenses);
        break;
      case 2:
        this.expenses = orderByExoenseOtoN(this.expenses);
        break;
      case 3:
        this.expenses = orderByExoenseLtoH(this.expenses);
        break;
      case 4:
        this.expenses = orderByExoenseHtoL(this.expenses);
        break;
      case 5:
        this.expenses = orderByExpenseCategory(this.expenses);
        break;
    }
    this.expenseFilterde = this.filterExpenses(this.expenses, this.fromDate, this.toDate, this.selected);
    this.expenseSlice = this.expenseFilterde.slice(this.startIndex, this.endIndex);
  }
}
