import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Category } from 'src/app/models/Objects';
import { CategorySummary, CategorySummaryRequest } from 'src/app/models/expense';
import { ExpenseService } from 'src/services/expense.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  filter !: CategorySummaryRequest;
  fromDate = null;
  toDate = null;
  categories = Category;
  list !: CategorySummary[];
  type : ChartType = 'pie';
  pieChartLabels !: string[];
  pieChartDatasets = [ {
    label : 'Category',
    data: [0]
  } ];
  sum : number = 0;

  constructor(private expenseService : ExpenseService, private userService : UserService) {}
  ngOnInit(): void {
    this.filter ={
      userId : this.userService.getUserId(),
      fromDate : this.fromDate,
      toDate : this.toDate,
    }

    this.expenseService.summary(this.filter).subscribe({
      next : (value)=>{
        this.list = value;
        this.sum = 0;
        value.forEach((item: { total: number; }) => {
          this.sum += item.total;
        });
        this.pieChartLabels = this.list.map(c => this.categories[c.category].name);
        this.pieChartDatasets[0].data=this.list.map(x => x.total);
      }
    })
  }

  typeChange(){
    this.type = this.type == 'pie' ? 'bar' : 'pie';
  }

  fromDateChange(event : any){
    event.value.setDate(event.value.getDate() + 1);
    this.fromDate = event.value;
    console.log(this.filter.fromDate);
    
    this.ngOnInit();
    
  }

  toDateChange(event : any){
    event.value.setDate(event.value.getDate() + 1);
    this.toDate = event.value;
    this.ngOnInit();
  }
}
