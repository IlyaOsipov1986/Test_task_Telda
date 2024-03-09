import { Component } from '@angular/core';
import {DateService} from "../../shared/date.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MomentPipe} from "../../shared/moment.pipe";

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [
    CommonModule,
    MomentPipe,
    AsyncPipe
  ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {
  constructor(public dateService: DateService) {}
  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
}
