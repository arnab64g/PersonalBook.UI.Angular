import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditResultComponent } from '../add-edit-result/add-edit-result.component';
import { ResultService } from 'src/services/result.service';
import { UserService } from 'src/services/user.service';
import { ResultListItem, SemesterWiseTableView, Summary } from 'src/app/models/Education';
import { DeleteResultComponent } from '../delete-result/delete-result.component';
import { resultViewSort, sortSemesterWiseTable } from 'src/app/extralib/sort';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result : SemesterWiseTableView[] = [];
  view : SemesterWiseTableView[] = [];
  list !: ResultListItem[];
  selesters !: Summary[]
  finalResult = {totalCredit : 0, cgpa : 0};
  userFullName !: string;

  constructor(private matDialod : MatDialog, private resultService : ResultService, private userService : UserService) {}
  
   ngOnInit(){
    this. result  = [];
    this.finalResult = {totalCredit : 0, cgpa : 0}
    this.userFullName = this.userService.getUserFullName();
    const userId = this.userService.getUserId();

    this.resultService.getResults(userId).subscribe({
      next: (res) => {
        this.list = res.results;
        const summary = res.summary;
        console.log(res);
        summary.forEach(element => {
          const sem = res.results.filter(x => x.semesterId == element.semId)[0]
          const resultView:SemesterWiseTableView = {
            semId : sem.id,
            semesterName : sem.semesterName,
            year : sem.year,
            month : sem.monthBng,
            resultList : res.results.filter(x => x.semesterId == element.semId),
            semesterTotalCredit : element.totalCredit,
            cgpa : Number((Math.round((element.totalPoints/ element.totalCredit)* 100) / 100).toFixed(2))
          }
          resultView.resultList = resultViewSort(resultView.resultList);
          this.result.push(resultView);
        });
        this.result = sortSemesterWiseTable(this.result);
        this.finalResult.totalCredit = res.totalCredit;
        this.view =this.result;
        if (res.totalCredit > 0) {
          this.finalResult.cgpa = Number((Math.round((res.totalPoints/res.totalCredit)* 100) / 100).toFixed(2));
        }
		else{
			this.finalResult.cgpa = 0;
		}
      }
    });

  }

  addResult(){
    const add = this.matDialod.open(AddEditResultComponent);
    add.afterClosed().subscribe({
      next : (value) =>{
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  edit(id : number){
    let res = this.list.filter(x => x.id == id)[0];
    let result = { 
      id : id,
     userId : this.userService.getUserId(),
     semesterId : res.semesterId,
     gradeId : res.gradeId,
     courseId : res.courseId
    }
    const d = this.matDialod.open(AddEditResultComponent, {data : result});
    d.afterClosed().subscribe({
      next : () => {
        this.ngOnInit();
      }
    });
  }

  delete(id : number){
    let res = this.list.filter(x => x.id == id)[0];

    const d = this.matDialod.open(DeleteResultComponent, {data : res});
    d.afterClosed().subscribe({
      next : () => {
        this.ngOnInit();
      }
    });
  }

  getRes(event : any){
    if (event == 0) {
      this.view = this.result;
    }
    else{
      this.view = this.result.filter(x => x.semId == event)
    }
  }

  printResult(){
    let win = window.open('/result');
    win?.print();
  }
}
