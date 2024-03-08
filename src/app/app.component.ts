import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {SelectorComponent} from "./components/selector/selector.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {OrganizerComponent} from "./components/organizer/organizer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SelectorComponent, CalendarComponent, OrganizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendar-task-manager';
}
