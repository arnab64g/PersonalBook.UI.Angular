import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from 'src/app/models/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemsterService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }

  addSemester( semester : Semester) : Observable<number>{
    const url = this.baseUrl + 'Semester';

    return this.httpClient.post<number>(url, semester);
  }

  editSemester( semester : Semester) : Observable<number>{
    const url = this.baseUrl + 'Semester';

    return this.httpClient.put<number>(url, semester);
  }

  getSemesterList(id : string) : Observable<Semester[]>{
    const url = this.baseUrl + 'Semester?id=' + id;

    return this.httpClient.get<Semester[]>(url);
  }

  deleteSemester(id : number) : Observable<number>{
    const url = this.baseUrl + 'Semester?id=' + id;

    return this.httpClient.delete<number>(url);
  }
}
