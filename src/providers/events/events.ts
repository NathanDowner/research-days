import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class EventsProvider {
  private eventsUrl = "api/events";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl).pipe(
      tap(_ => console.log("Events fetched")),
      catchError(this.handleError<any[]>("getEvents", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
