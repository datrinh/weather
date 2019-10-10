import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from './geocoding.service';
import { DarkSkyResponse } from './DarkSkyResponse';
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

  /**
   * Use DarkSkyApi to retrive weather data for speficic coords
   * @param coords latitude and longitude for location
   * @param time Either UNIX or [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone]
   */
  getWeatherData(
    coords: Coordinates,
    time?: string
  ): Observable<DarkSkyResponse> {
    const request = `${CORS_PREFIX}/${API_URL}/${API_KEY}/${coords.latitude},${coords.longitude}`;
    if (time) {
      return this.http.get<DarkSkyResponse>(`${request},${time}?units=ca`);
    } else {
      return this.http.get<DarkSkyResponse>(request + '?units=ca');
    }
  }
}
