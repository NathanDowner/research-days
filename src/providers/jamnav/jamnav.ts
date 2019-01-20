import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location';
import { Observable } from 'rxjs';

/*
  Generated class for the JamnavProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JamnavProvider {
  url: string = "https://api.jamnav.com/v1/locations/?name=";

  constructor(public http: HttpClient) {
    console.log('Hello JamnavProvider Provider');
  }

  getLocationData(location: string): Observable<Location> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Authorization","d6cb3d1cd7ad15117a54ede405f38ca529d3fb7e");

    let name: string = location.replace(" ", "+");
    return this.http.get<Location>(this.url + name, {headers: headers});
  }

}
