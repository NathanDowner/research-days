import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location';
import { Observable } from 'rxjs';
import { JamnavResponse } from '../../models/jamnavResponse';

@Injectable()
export class JamnavProvider {
  url: string = "https://api.jamnav.com/v1/locations/?name=";
  key: string = "d6cb3d1cd7ad15117a54ede405f38ca529d3fb7e";

  constructor(public http: HttpClient) {
    console.log('Hello JamnavProvider Provider');
  }

  getLocationData(location: string): Observable<JamnavResponse> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set("Authorization", `Token ${this.key}`)

    let name:string = location.split(" ").join("+");
    return this.http.get<JamnavResponse>(this.url + name, {headers: header});
  }

}
