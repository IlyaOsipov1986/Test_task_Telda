import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
  standalone: true,
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {
  transform(m: moment.Moment | null, format: string = 'MMMM YYYY'): string {
    // @ts-ignore
    return m.format(format)
  }
}

