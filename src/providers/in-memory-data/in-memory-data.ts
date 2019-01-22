import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { fake } from "faker";
import { Event } from "../../models/event";

@Injectable()
export class InMemoryDataProvider implements InMemoryDbService {
  private MAX_EVENTS: number = 5;

  createDb() {
    const events: Event[] = [];

    for (let i = 0; i < this.MAX_EVENTS; i++) {
      events.push({
        id: `${i + 1}`,
        title: fake("{{name.title}}"),
        type: "LECTURE PRESENTATION",
        start_date: "2019-02-06",
        details: fake("{{lorem.paragraph}}"),
        faculty: "Science & Technology",
        department: "Computing",
        imgSrc: fake("{{image.imageUrl}}"),
        link: fake("{{image.imageUrl}}"),
        venue: "Assembly Hall",
        coords: {
          lat: parseFloat(fake("{{address.latitude}}")),
          lon: parseFloat(fake("{{address.longitude}}"))
        }
      });
    }

    return { events };
  }
}
