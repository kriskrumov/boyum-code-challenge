import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://boyumcodechallenge.azurewebsites.net/api/todolist';

  constructor(private httpClient: HttpClient) { }

  getData = (): Observable<Todo[]> => {
    return this.httpClient.get<Todo[]>(this.url) as Observable<Todo[]>;
  }

}
