import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Grade } from 'src/app/models/Education';
import { GradeService } from 'src/services/grade.service';
import { AddEditGradeComponent } from '../add-edit-grade/add-edit-grade.component';
import { DeleteGradePopupComponent } from '../delete-grade-popup/delete-grade-popup.component';
import { UserService } from 'src/services/user.service';
import { sortGrade } from 'src/app/extralib/sort';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
  glist !: Grade[];
  grades !: Grade[]; 
  grade !: Grade;
  isAdmin !: boolean;
  val = 4;
  
  constructor(private gradeService : GradeService, private matDialog: MatDialog, private userService : UserService) {}

  ngOnInit() : void {
    let user = this.userService.gerRole();
    if(user == "Admin"){
      this.isAdmin = true;
    }

    this.grade = {
      id : 0,
      gradeName : '',
      points : 0,
      scale: 0,
      maxNumber : 0,
      minNumber : 0,
    }
    
    this.gradeService.getGrades().subscribe({
      next :(res) =>{
        this.glist = sortGrade(res);
        this.grades = this.glist.filter(g => g.scale==this.val); 
      }
    });
  }

  addGrade(){
    const res = this.matDialog.open(AddEditGradeComponent, {data : this.grade});
    res.afterClosed().subscribe(
      res =>{
        if (res) {
          this.ngOnInit();
        }
      }
    );
  }

  deleteGrade(id : number ){
    this.grade = this.grades.filter(d => d.id == id)[0];
    const deleteg = this.matDialog.open(DeleteGradePopupComponent, {data:this.grade});
    deleteg.afterClosed().subscribe({
      next : () =>{
        this.ngOnInit()
      }
    });
  }

  editGrade(id : number){
    this.grade = this.grades.filter(d => d.id == id)[0];
    const editGrade = this.matDialog.open(AddEditGradeComponent, {data : this.grade});
    editGrade.afterClosed().subscribe({
      next : () =>{
        this.ngOnInit();
      }
    });
  }

  scaleChange(event : any){
    this.val = event;
    this.grades = this.glist.filter(g => g.scale == event);
  }
}
