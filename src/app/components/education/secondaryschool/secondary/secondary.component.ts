import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecondaryResult, SecondaryResultTable, SecondarySummary } from 'src/app/models/Education';
import { UserService } from 'src/services/user.service';
import { AddEditSecondaryResultComponent } from '../add-edit-secondary-result/add-edit-secondary-result.component';
import { SecondaryService } from 'src/services/secondary.service';
import { sortSecondaeyResults } from 'src/app/extralib/sort';
import { GetGPA } from 'src/app/extralib/calculation';
import { DeleteSecondaryResultComponent } from '../delete-secondary-result/delete-secondary-result.component';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css']
})

export class SecondaryComponent implements OnInit {
  level : number = 10;
  result !: SecondaryResult;
  resutls !: SecondaryResultTable[];
  resutlsT !: SecondaryResultTable[];
  userId !: string;
  summaries !: SecondarySummary[];
  summary !: SecondarySummary;
  hasOptional !: boolean;
  gpa : number = 0;

  constructor(private matDialog : MatDialog, private userService : UserService, private secondaryService : SecondaryService) {}
  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    
    this.secondaryService.getResults(this.userId).subscribe({
      next : (res) =>{
        this.resutls = res.results;
        this.summaries = res.summary;
        this.resutlsT = sortSecondaeyResults(this.resutls.filter(r => r.level == this.level));
        this.summary = this.summaries.filter(x => x.level == this.level)[0];
        
        if(this.resutlsT.find(x=>x.isOptional==1)){
          this.hasOptional = true;
        }
        else{
          this.hasOptional = false;
        }
        this.gpa = GetGPA(this.summary, this.hasOptional);
      }
    });
  }
  
  addResult(){
    this.result = {
      id : 0,
      userId : this.userId,
      sl:0,
      subject : '',
      gradeId : null,
      isOptional : 0,
      level: this.level
    }
    
    const dialog = this.matDialog.open(AddEditSecondaryResultComponent, {data : this.result});
    
    dialog.afterClosed().subscribe({
      next : (res) =>{
        if (res) {
          this.ngOnInit();
        }
      } 
    });
  }

  edit(id : number){
    this.result = this.resutls.find(x => x.id == id)!;
    const dialog = this.matDialog.open(AddEditSecondaryResultComponent, {data : this.result});
    dialog.afterClosed().subscribe({
      next : (res) =>{
        if (res) {
          this.ngOnInit();
        }
      } 
    });
  }

  delete(id : number){
    let res = this.resutls.find(x => x.id == id)!;
    const dialog = this.matDialog.open(DeleteSecondaryResultComponent, {data : res});
    dialog.afterClosed().subscribe({
      next : (res) =>{
        if (res) {
          this.ngOnInit();
        }
      } 
    });
  }
  
  levelChanged(event : any){
    this.level = event;
    this.resutlsT = sortSecondaeyResults(this.resutls.filter(r => r.level == this.level));
    this.summary = this.summaries.find(x => x.level == this.level)!;
    
    if(this.resutlsT.find(x=>x.isOptional==1)){
      this.hasOptional = true;
    }
    else{
      this.hasOptional = false;
    }

    this.gpa = GetGPA(this.summary, this.hasOptional);
  }
}
