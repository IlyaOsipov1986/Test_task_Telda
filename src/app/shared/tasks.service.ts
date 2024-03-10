import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task, CreateResponse} from "../../types/organizer.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angular-test-tack-telda-db-default-rtdb.europe-west1.firebasedatabase.app/tasks'

  constructor(private http: HttpClient) {
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name}
      }))
  }
}
