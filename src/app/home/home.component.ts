import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { GeocodingService, Coordinates } from '../shared/geocoding.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private weather: WeatherService, private geo: GeocodingService) {}

  ngOnInit() {}

  lookUpWeather(searchTerm: string) {
    this.geo
      .getCoordinates(searchTerm)
      .pipe(
        flatMap((coords: Coordinates) => this.weather.getWeatherData(coords))
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
