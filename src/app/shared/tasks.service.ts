import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task, CreateResponse} from "../../types/organizer.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import moment from "moment";

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angular-test-tack-telda-db-default-rtdb.europe-west1.firebasedatabase.app/tasks'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if(!tasks) {
          return []
        }
        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      }))
  }

  loadGetTasksAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}.json`)
      .pipe(map(tasks => {
        if(!tasks) {
          return []
        }
        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      }))
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name}
      }))
  }

  remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }

  execute(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`${TasksService.url}/${task.date}/${task.id}.json`, {...task, active: true})
      .pipe(map(res => {
        return res
      }))
  }
}
