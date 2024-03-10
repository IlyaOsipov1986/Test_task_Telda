import { Component, OnInit } from '@angular/core';
import { Week } from "../../../types/calendar.interface";
import {DateService} from "../../shared/date.service";
import moment from "moment";
import {NgForOf} from "@angular/common";
import {MomentPipe} from "../../shared/moment.pipe";
import {TasksService} from "../../shared/tasks.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgForOf,
    MomentPipe
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {

  tasks: (string | undefined)[] = []
  calendar: Week[] | undefined;

  constructor(private dateService: DateService,
              private tasksService: TasksService) {}

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.loadGetTasksAll())
    ).subscribe(tasks => {
      this.tasks = tasks.map(el => el.id)

      function handleCalendarUpdate(tasks: (string | undefined)[], calendarDays: Week[] | undefined) {

        const formatDateTask = tasks.map(task => {
          let charDay = task?.substring(2, 0)
          let charMonth= task?.substring(3, 5)
          let charYear= task?.substring(6, 10)
          return `${charMonth}/${charDay}/${charYear}`
        })

        if(!tasks) {
          return calendarDays
        }

        calendarDays?.forEach(el => {
          el.days.forEach(day => {
            if(formatDateTask.find(date => date === day.value.format('L'))) {
              day.active = true
            }
          })
        })

        return calendarDays
      }

      const updateCalendar: Week[] | undefined = handleCalendarUpdate(this.tasks, this.calendar)
      return this.calendar = updateCalendar
    })
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')
    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = date.add(1, 'day').clone()
          const active = moment().isSame(value, 'date')
          const disabled = !now.isSame(value, 'month')
          const selected = now.isSame(value, 'date')

          return {value, active, disabled, selected}
        })
      })
    }
    this.calendar = calendar
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }

}
