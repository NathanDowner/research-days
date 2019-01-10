import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { fake } from "faker";
import { Event } from "../../models/event";

@Injectable()
export class InMemoryDataProvider implements InMemoryDbService {
  private MAX_EVENTS: number = 15;

  createDb() {
    const events: Event[] = [];

    for (let i = 0; i < this.MAX_EVENTS; i++) {
      events.push({
        id: i + 1,
        title: fake("{{name.title}}"),
        host: fake("{{company.companyName}}"),
        startTime: "11:00am",
        day: Math.ceil(Math.random() * 3),
        endTime: "11:00pm",
        imgSrc: fake("{{image.imageUrl}}"),
        venue: fake("{{address.city}}"),
        speaker: fake("{{name.title}}. {{name.firstName}} {{name.lastName}}"),
        description: fake("{{lorem.paragraph}}"),
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
