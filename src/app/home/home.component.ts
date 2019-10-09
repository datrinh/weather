import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { GeocodingService, Coordinates } from '../shared/geocoding.service';
import { flatMap, tap } from 'rxjs/operators';
import { DarkSkyResponse, DailyDatum } from '../shared/DarkSkyResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location;
  weatherData: DarkSkyResponse;
  forecasts: DailyDatum[];

  constructor(public weather: WeatherService, private geo: GeocodingService) {}

  ngOnInit() {
    // Todo löschen
    this.lookUpWeather('Dresden');
  }

  lookUpWeather(searchTerm: string) {
    this.geo
      .getCoordinates(searchTerm)
      .pipe(
        tap(res => {
          this.location = res;
          console.log(this.location);
        }),
        flatMap((coords: Coordinates) => this.weather.getWeatherData(coords))
      )
      .subscribe(res => {
        this.weatherData = res;
        this.forecasts = res.daily.data.slice(0, 5);
        console.log(res);
      });
  }
}
