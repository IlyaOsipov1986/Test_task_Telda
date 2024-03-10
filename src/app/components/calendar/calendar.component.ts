import { Component, OnInit } from '@angular/core';
import { Week } from "../../../types/calendar.interface";
import {DateService} from "../../shared/date.service";
import moment from "moment";
import {NgForOf} from "@angular/common";
import {MomentPipe} from "../../shared/moment.pipe";

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

  calendar: Week[] | undefined;

  constructor(private dateService: DateService) {}

  ngOnInit() {
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
