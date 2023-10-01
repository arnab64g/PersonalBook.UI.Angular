import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/models/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }
  
  getGrades() : Observable<Grade[]>{
    const url = this.baseUrl +'Grade'

    return this.httpClient.get<Grade[]>(url);
  }

  addGrades(grade : Grade) : Observable<number>{
    const url = this.baseUrl +'Grade'

    return this.httpClient.post<number>(url, grade);
  }

  deleteGrade(id: number) : Observable<number>{
    const url = this.baseUrl + 'Grade' + '?id=' + String(id);

    return this.httpClient.delete<number>(url);
  }

  editGrades(grade : Grade) : Observable<number>{
    const url = this.baseUrl +'Grade'

    return this.httpClient.put<number>(url, grade);
  }
}
