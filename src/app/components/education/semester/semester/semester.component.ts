import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSemesterComponent } from '../add-edit-semester/add-edit-semester.component';
import { Semester } from 'src/app/models/Education';
import { SemsterService } from 'src/services/semster.service';
import { UserService } from 'src/services/user.service';
import { Month } from 'src/app/models/Objects';
import { DeleteSemesterComponent } from '../delete-semester/delete-semester.component';
import { sortSemester } from 'src/app/extralib/sort';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {
  semesters !: Semester[];
  userId !: string;
  month = Month;

  constructor(private matDialog : MatDialog, private semesterService : SemsterService, private userService : UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    
    this.semesterService.getSemesterList(this.userId).subscribe({
      next : (value) =>{
          this.semesters = sortSemester(value);
      }
    });
  }

  addSemester(){
    const res = this.matDialog.open(AddEditSemesterComponent, {data:null});
    
    res.afterClosed().subscribe({
      next : (val) =>{
        if (val) {
          this.ngOnInit();
        }
      }
    })
  }

  editSemester(id : number){
    const sem = this.semesters.find(d => d.id == id);
    console.log(sem);
    const res = this.matDialog.open(AddEditSemesterComponent, {data:sem});
    res.afterClosed().subscribe({
      next : (value) => {
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  deleteSemester(id : number){
    let sem = this.semesters.find(d => d.id == id);
    const res = this.matDialog.open(DeleteSemesterComponent, {data : sem});
    res.afterClosed().subscribe({
      next : (value) =>{
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }
}
