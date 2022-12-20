import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  public get(archived = false): Observable<any> {
    return this.http.get(
      `https://lab13.zecer.wi.zut.edu.pl/api/fd46507?archived=${archived}`
    );
  }

  public post(task: Task): Observable<any> {
    return this.http.post(
      'https://lab13.zecer.wi.zut.edu.pl/api/fd46507',
      task
    );
  }

  public put(task: Task): Observable<any> {
    this.http
      .put(`https://lab13.zecer.wi.zut.edu.pl/api/fd46507/${task.id}`, task)
      .subscribe((response) => {});
    return;
  }

  public deleteTask(task: Task): Observable<any> {
    this.http
      .delete(`https://lab13.zecer.wi.zut.edu.pl/api/fd46507/${task.id}`)
      .subscribe((response) => {});
    return;
  }
}
