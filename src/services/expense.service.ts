import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorySummaryRequest, Expense } from 'src/app/models/expense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }

  post(expense : Expense) : Observable<number>{
    const url = this.baseApiUrl + 'Expense';

    return this.httpClient.post<number>(url, expense);
  }

  get(id : string) : Observable<Expense[]> {
    const url = this.baseApiUrl + 'Expense?id=' + id;

    return this.httpClient.get<Expense[]>(url);
  }

  put(expense : Expense) : Observable<number>{
    const url = this.baseApiUrl + 'Expense';

    return this.httpClient.put<number>(url, expense);
  }

  delete(id : number) : Observable<number>{
    const url = this.baseApiUrl + 'Expense?id=' + String(id);

    return this.httpClient.delete<number>(url);
  }

  summary(filter : CategorySummaryRequest) : Observable<any>{
    const url = this.baseApiUrl + 'Expense/Category';

    return this.httpClient.post<number>(url, filter);
  }
}
