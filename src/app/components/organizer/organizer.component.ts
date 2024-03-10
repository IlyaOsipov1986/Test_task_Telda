import {Component, OnInit} from '@angular/core';
import {DateService} from "../../shared/date.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MomentPipe} from "../../shared/moment.pipe";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TasksService} from "../../shared/tasks.service";
import {Task} from "../../../types/organizer.interface";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [
    AsyncPipe,
    MomentPipe,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.scss'
})
export class OrganizerComponent implements OnInit {

  form: FormGroup | any
  tasks: Task[] = []

  constructor( protected dateService: DateService,
               private tasksService: TasksService) {

  }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const tilte = this.form.value.title
    const task: Task = {
      titleTask: tilte,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe( {
      error: (err) => console.error(err),
      complete: () => {
        this.form.reset()
        this.tasks.push(task)
      }
  })}
  remove(task: Task) {
    this.tasksService.remove(task).subscribe({
      error: (err) => console.error(err),
      complete: () => {
        this.tasks = this.tasks.filter(el => el.id !== task.id)
      }
    })
  }
}
