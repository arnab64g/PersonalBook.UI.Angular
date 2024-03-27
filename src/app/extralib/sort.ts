import { Course, Grade, ResultListItem, SecondaryResultTable, Semester, SemesterWiseTableView } from "../models/Education";
import { Expense } from "../models/expense";

export function sortGrade(grades: Grade[]) : Grade[] {
     return grades.sort((a, b) =>{
          if(a.points < b.points){
            return 1;
          }
          else{
            return -1;
          }
        });
}

export function sortSemester(semesters : Semester[]){
  return semesters.sort((a, b)=>{
    if(a.year < b.year){
      return -1;
    }
    else if(a.year == b.year){
      return (a.monthBng < b.monthBng) ? -1 : 1; 
    }
    else{
      return 1;
    }
  });
}

export function sortCourses(courses: Course[]) : Course[] {
  return courses.sort((a, b) => {
    if (a.courseCode > b.courseCode) {
      return 1;
    }
    else{
      return -1;
    }
  })
}

export function sortSemesterWiseTable(semesters:SemesterWiseTableView[]) {
  return semesters.sort((a, b)=>{
    if(a.year < b.year){
      return -1;
    }
    else if(a.year == b.year){
      return (a.month < b.month) ? -1 : 1; 
    }
    else{
      return 1;
    }
  });
}

export function resultViewSort(results:ResultListItem[]) {
  return results.sort((a, b) => {
    if(a.courseCode < b.courseCode){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function sortSecondaeyResults(results:SecondaryResultTable[]) {
  return results.sort((a, b) => {
    if(a.sl < b.sl){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function sortByDateDesc(expenses:Expense[]) {
  return expenses.sort((a, b) => {
    if(a.date > b.date){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByCourseTitleAsc(course:Course[]) : Course[] {
  return course.sort((a, b) => {
    if(a.courseTitle < b.courseTitle){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByCourseTitleDesc(course:Course[]) : Course[] {
  return course.sort((a, b) => {
    if(a.courseTitle > b.courseTitle){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByCourseCodeAsc(course:Course[]) : Course[] {
  return course.sort((a, b) => {
    if(a.courseCode < b.courseCode){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByCourseCodeDesc(course:Course[]) : Course[] {
  return course.sort((a, b) => {
    if(a.courseCode > b.courseCode){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByExoenseOtoN(expenses:Expense[]) : Expense[] {
  return expenses.sort((a, b) => {
    if(a.date.getTime() < b.date.getTime()){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByExoenseNtoO(expenses:Expense[]) : Expense[] {
  return expenses.sort((a, b) => {
    if(a.date.getTime() > b.date.getTime()){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByExoenseLtoH(expenses:Expense[]) : Expense[] {
  return expenses.sort((a, b) => {
    if(Number(a.amount) < Number(b.amount) ){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByExoenseHtoL(expenses:Expense[]) : Expense[] {
  return expenses.sort((a, b) => {
    if(Number(a.amount) > Number(b.amount)){
      return -1;
    }
    else{
      return 1
    }
  });
}

export function orderByExpenseCategory(expenses:Expense[]) : Expense[] {
  return expenses.sort((a, b) => {
    if(a.category < b.category){
      return -1;
    }
    else{
      return 1
    }
  });
}