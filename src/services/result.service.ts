import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GetResults, Result } from 'src/app/models/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  baseUrl = environment.baseApiUrl;
  constructor(private httpClient : HttpClient) { }

  postResult(result : Result) : Observable<number> {
    const url = this.baseUrl + 'Result';

    return this.httpClient.post<number>(url, result);
  }

  getResults(userId : string) : Observable<GetResults>{
    const url = this.baseUrl + 'Result?id=' + userId;

    return this.httpClient.get<GetResults>(url);
  }

  putResult(result : Result) : Observable<number> {
    const url = this.baseUrl + 'Result';

    return this.httpClient.put<number>(url, result);
  }

  deleteResults(id : number) : Observable<GetResults>{
    const url = this.baseUrl + 'Result' + '?id=' + String(id);

    return this.httpClient.delete<GetResults>(url);
  }
}
