import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getCoords(location: string) {
    let name: string = location.replace(" ", "+");
    this.http.get(this.url + name);
  }

}
