import { Injectable } from '@angular/core';
import { Task } from '../Task';
// import { TASKS } from '../mock-tasks';
// Above import can only be used to mock-tasks
import { Observable } from 'rxjs';
//Import 'of' from 'rxjs' when mocking
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "Application/Json"
    }
  )
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {

    //send a get request
    return this.http.get<Task[]>(this.apiUrl);

    //Used when mocking tasks
    // const task = TASKS;
    // return of(task);
  }

  deleteTask(task: Task) {
    //We need a url with an id
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task) {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task:Task){
    return this.http.post<Task>(this.apiUrl,task,httpOptions);
  }
}
