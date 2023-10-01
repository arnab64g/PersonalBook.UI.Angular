import { SecondarySummary } from "../models/Education";

export function GetGPA(summary:SecondarySummary, has : boolean) {
    let totalPoints = summary.totalPoints;
    let subjectCount = summary.totalSubjects;
    let gpa = 0;
    if (has) {
        totalPoints = summary.totalPoints - 2;
        subjectCount = summary.totalSubjects - 1;
        if (totalPoints > 0 && subjectCount > 0) {
            gpa = totalPoints / subjectCount;
            gpa = Math.round(gpa * 100)/100;
            if (gpa > 5) {
                gpa = 5;
            }
        }
    }
    else{
        totalPoints = summary.totalPoints;
        subjectCount = summary.totalSubjects;
        if (totalPoints > 0 && subjectCount > 0) {
            gpa = totalPoints / subjectCount;
            gpa = Math.round(gpa * 100)/100;
        }
    }

    return gpa;
}