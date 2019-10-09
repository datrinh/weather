import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GeocodingService } from './geocoding.service';
import { Coordinates } from './geocoding.service';
import { DarkSkyResponse } from './DarkSkyResponse';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Quick Fix for CORS problems
const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com';

// API Docs: https://darksky.net/dev/docs#forecast-request
const API_URL = 'https://api.darksky.net/forecast';
const API_KEY = environment.darkSkyApiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(coords: Coordinates): Observable<DarkSkyResponse> {
    return this.http.get<DarkSkyResponse>(
      `${CORS_PREFIX}/${API_URL}/${API_KEY}/${coords.latitude},${coords.longitude}?units=ca`
    );
  }
}
