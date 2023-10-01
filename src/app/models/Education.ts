export interface Grade{
     id : number;
     gradeName : string;
     points : number;
     scale : number ;
     minNumber : number;
     maxNumber : number;
}

export interface Semester{
     id : number;
     userId  : string;
     semesterName : string;
     monthBng : number;
     year : number;
}

export interface Course{
     id : number;
     userId : string;
     courseCode : string;
     courseTitle : string;
     creditPoint : number;
}

export interface Result{
     id : number;
     userId : string;
     semesterId : number | null;
     gradeId : number | null;
     courseId : number | null;
}

export interface GetResults{
     results : ResultListItem[];
     summary : Summary[];
     totalPoints: number;
     totalCredit : number;
}

export interface ResultListItem{
     id : number;
     semesterId : number;
     semesterName : string;
     monthBng : number;
     year : number;
     courseCode : string;
     courseTitle : string;
     gradeId  : number;
     courseId : number;
     gradeName : string;
     points : number;
     creditPoint : number;
}

export interface Summary{
     semId : number;
     totalPoints: number;
     totalCredit : number;
}

export interface SemesterWiseTableView{
     semId : number;
     semesterName : string;
     month : number;
     year : number;
     resultList : ResultListItem[];
     semesterTotalCredit : number;
     cgpa : number;
}

export interface SecondaryResult{
     id : number;
     sl : number;
     userId: string;
     subject : string;
     gradeId : number | null;
     isOptional : number;
     level : number;
}

export interface SecondarySummary{
     level : number;
     totalSubjects : number;
     totalPoints : number;
}

export interface SecondaryResultTable extends SecondaryResult{
     gradeName : string;
     points : number;
}

export interface AllSecondaryResults{
     results : SecondaryResultTable[];
     summary : SecondarySummary[];
}
