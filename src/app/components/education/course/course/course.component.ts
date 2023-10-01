import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { Course } from 'src/app/models/Education';
import { CourseService } from 'src/services/course.service';
import { UserService } from 'src/services/user.service';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';
import { orderByCourseCodeAsc, orderByCourseCodeDesc, orderByCourseTitleAsc, orderByCourseTitleDesc, sortCourses } from 'src/app/extralib/sort';
import { CourseSort } from 'src/app/models/Objects';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit{
  courses !: Course[];
  coursesT !: Course[];
  course !: Course;
  length : number = 10;
  pageSize : number = 10;
  courseSort = CourseSort;
  orderChoice : number = 1;
  startIndex : number = 0;
  endIndex : number = this.startIndex + this.pageSize;

  constructor(private matDialog : MatDialog, private courseService : CourseService, private userService : UserService) {}
  
  ngOnInit(): void {
    const userId = this.userService.getUserId();
    
    this.courseService.getCourses(userId).subscribe({
      next : (list) => {
        this.courses = sortCourses(list);
        this.coursesT = this.courses.slice(this.startIndex, this.endIndex);
        this.length = this.courses.length;
      }
    });
  }

  addCourse(){
    this.course = {
      id : 0,
      userId : this.userService.getUserId(),
      courseCode:'',
      courseTitle:'',
      creditPoint: 0
    }

    const addForm = this.matDialog.open(AddEditCourseComponent, {data:this.course});

    addForm.afterClosed().subscribe({
      next : (value) => {
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  edit(id : number){
    this.course = this.courses.filter(d => d.id == id)[0];
    const editDialog = this.matDialog.open(AddEditCourseComponent, {data : this.course});
    editDialog.afterClosed().subscribe({
      next : (value) => {
        if (value) {
          this.ngOnInit();
        }
      }
    });
  }

  delete(id : number){
    this.course = this.courses.filter(d => d.id == id)[0];
    const deletePop = this.matDialog.open(DeleteCourseComponent, {data : this.course});
    deletePop.afterClosed().subscribe({
      next : (res) => {
        if (res) {
          this.ngOnInit();
        }
      }
    });
  }
  onPageChange(event : any){
    this.pageSize = event.pageSize;
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex  = this.startIndex + this.pageSize;
    this.coursesT = this.courses.slice(this.startIndex, this.endIndex);
  }

  orderByChange(event : any){
    this.orderChoice = event;

    switch(this.orderChoice){
      case 1: 
        this.courses = orderByCourseCodeAsc(this.courses);
        break;
      case 2: 
        this.courses = orderByCourseCodeDesc(this.courses);
        break;
      case 3: 
        this.courses = orderByCourseTitleAsc(this.courses);
        break;
      case 4: 
        this.courses = orderByCourseTitleDesc(this.courses);
        break;
    }

    this.coursesT = this.courses.slice(this.startIndex, this.endIndex);
  }
}
