import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { fake } from "faker";
import { Event } from "../../models/event";

@Injectable()
export class InMemoryDataProvider implements InMemoryDbService {
  private MAX_EVENTS: number = 96;

  createDb() {
    const events: Event[] = [];

    for (let i = 0; i < this.MAX_EVENTS; i++) {
      events.push({
        nid: `${i + 1}`,
        title: fake("{{name.title}}"),
        researcher_name: fake("{{name.firstName}} {{name.lastName}}"),
        date: "2019-02-3 11:00am",
        abstract: fake("{{lorem.paragraph}}"),
        path: "/fake/path",
        imgSrc: fake("{{image.imageUrl}}"),
        location: {
          name: fake("{{company.companyName}}"),
          coords: {
            lat: parseFloat(fake("{{address.latitude}}")),
            lon: parseFloat(fake("{{address.longitude}}"))
          }
        }
      });
    }

    return { events };
  }
}
