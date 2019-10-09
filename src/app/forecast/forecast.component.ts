import { Component, OnInit, Input } from '@angular/core';
import { DailyDatum } from '../shared/DarkSkyResponse';
import { WeatherService } from '../shared/weather.service';
import { format, fromUnixTime } from 'date-fns';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input() forecasts: DailyDatum[];
  constructor(public weather: WeatherService) {}

  ngOnInit() {}

  formatWeekday(date): string {
    return format(fromUnixTime(date), 'iii');
  }
}
