import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllSecondaryResults, SecondaryResult } from 'src/app/models/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SecondaryService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }

  addResult(result : SecondaryResult) : Observable<number>{
    const url = this.baseUrl + 'SecondaryResult';
	
    return this.httpClient.post<number>(url, result);
  }

  updateResult(result : SecondaryResult) : Observable<number>{
    const url = this.baseUrl + 'SecondaryResult';

    return this.httpClient.put<number>(url, result);
  }


  getResults(id : string) : Observable<AllSecondaryResults> {
    const url = this.baseUrl + 'SecondaryResult?id=' + String(id);
 
    return this.httpClient.get<AllSecondaryResults>(url);
  }

  deleteResult(id : number) : Observable<number> {
    const url = this.baseUrl + 'SecondaryResult?id=' + String(id);

    return this.httpClient.delete<number>(url);
  }
}
