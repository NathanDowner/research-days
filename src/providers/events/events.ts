import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { tap, catchError } from "rxjs/operators";
import { Event } from "../../models/Event";

@Injectable()
export class EventsProvider {
  private eventsUrl =
    "https://www.mona.uwi.edu/researchdays/api/views/schedule?display_id=services_1&limit=10&offset=0&filters[taxonomy_vocabulary_2_tid]=2018";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl).pipe(
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
