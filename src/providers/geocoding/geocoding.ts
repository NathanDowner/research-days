import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocodeResponse } from '../../models/geocodeResponse';
import { Observable } from 'rxjs';

/*
  Generated class for the GeocodingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocodingProvider {

  url: string = "https://maps.googleapis.com/maps/api/geocode/json";
  key: string = "AIzaSyDKcmfgCAUE5RBxqOI8Ucsz9SHqjDjCVVA";
  southwestBound: string = "18.006908, -76.753160";
  northeastBound: string = "18.005950, -76.738427";
  params : HttpParams = new HttpParams();

  constructor(public http: HttpClient) {
    console.log('Hello GeocodingProvider Provider');
  }

  getLocation(name: string): Observable<GeocodeResponse> {
    this.params.set("key", this.key);
    this.params = this.params.set('address', name);

    return this.http.get<GeocodeResponse>(this.url, {
      params: {
        address: name,
        key: this.key,
        bounds: `${this.southwestBound}|${this.northeastBound}`
      }
    });
  }

}
