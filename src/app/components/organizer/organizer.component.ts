import {Component, OnInit} from '@angular/core';
import {DateService} from "../../shared/date.service";
import {AsyncPipe} from "@angular/common";
import {MomentPipe} from "../../shared/moment.pipe";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TasksService} from "../../shared/tasks.service";
import {Task} from "../../../types/organizer.interface";

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [
    AsyncPipe,
    MomentPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.scss'
})
export class OrganizerComponent implements OnInit {

  form: FormGroup | any

  constructor( protected dateService: DateService,
               private tasksService: TasksService) {

  }

  ngOnInit() {
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
      next: (el) => console.log('new', el),
      error: (err) => console.error(err),
      complete: () => this.form.reset()
  })
}}
