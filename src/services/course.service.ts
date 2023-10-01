import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }

  getCourses(id : string) : Observable<Course[]>{
    const url = this.baseUrl + 'Course?id=' + id;
    
    return this.httpClient.get<Course[]>(url);
  }

  postCourse(course : Course) : Observable<number>{
    const url = this.baseUrl + 'Course';

    return this.httpClient.post<number>(url, course);
  }

  putCourse(course : Course) : Observable<number>{
    const url = this.baseUrl + 'Course';

    return this.httpClient.put<number>(url, course);
  }

  deleteCourse(id: number) : Observable<number>{
    const url = this.baseUrl + 'Course' + '?id=' + String(id);

    return this.httpClient.delete<number>(url);
  }
}
