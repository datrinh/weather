import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { DailyDatum } from '../shared/DarkSkyResponse';
import { format, fromUnixTime } from 'date-fns';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  @Input() forecasts: DailyDatum[];
  @Input() summary: string;
  constructor() {}

  ngOnInit() {}

  /**
   * Transforms UNIX timestamp into short week day strings.
   * TODO: Refactor into pipe
   * @param date UNIX timestamp
   */
  formatWeekday(date: number): string {
    return format(fromUnixTime(date), 'iii');
  }
}
