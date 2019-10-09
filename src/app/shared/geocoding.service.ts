import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = 'https://eu1.locationiq.com/v1/search.php';
const API_KEY = environment.geocodingApiKey;

export interface Coordinates {
  name?: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  getCoordinates(searchTerm: string): Observable<Coordinates> {
    return this.http
      .get(`${API_URL}?q=${searchTerm}&key=${API_KEY}&format=json`)
      .pipe(
        map((res: any) => {
          console.log('Coords:', res);
          return {
            name: res[0].display_name,
            latitude: res[0].lat,
            longitude: res[0].lon
          };
        })
      );
  }
}
