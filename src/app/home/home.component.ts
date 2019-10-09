import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { GeocodingService, Coordinates } from '../shared/geocoding.service';
import { flatMap, tap } from 'rxjs/operators';
import { DarkSkyResponse, DailyDatum, Daily } from '../shared/DarkSkyResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location;
  weatherData: DarkSkyResponse;
  daily: Daily;

  constructor(public weather: WeatherService, private geo: GeocodingService) {}

  ngOnInit() {
    // Todo löschen
    this.lookUpWeather('Dresden');
  }

  /**
   * Transforms search term into coords and then requests weather data.
   * @param searchTerm search string can be location
   */
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
        this.daily = res.daily;
        console.log(res);
      });
  }
}
