import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {of} from "rxjs/observable/of";
import {ajaxGetJSON} from "rxjs/observable/dom/AjaxObservable";
import {T} from "@angular/core/src/render3";

/*
  Generated class for the PostersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable()
export class PostersProvider {

  private uwiUrl = "https://www.mona.uwi.edu";
  private posterURl = this.uwiUrl + "/researchdays/api/views/posters";

  /**
   *
   * @param http
   */
  constructor(public http: HttpClient) {
    console.log('Hello PostersProvider Provider');
    console.log(this.posterURl);
  }

  getPostersAjax(): Observable<any[]> {
    return ajaxGetJSON<any[]>(this.posterURl, (data) => {
      console.log(data)
    });
  }

  getPostersHttp(): Observable<any[]>{
    return this.http.get<any[]>(this.posterURl/*,  httpOptions */)
      .pipe(
        tap(() => console.log("fetched posters")),
        catchError(this.handleError<any[]>("getPosters", []))
      );
  }

  /**
   * Handles error from http requests
   * @param operation
   * @param result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + " operation failed: " + error.message);
      return of(result as T);
    };
  }

}
