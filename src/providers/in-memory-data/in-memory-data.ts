import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { fake } from "faker";

@Injectable()
export class InMemoryDataProvider implements InMemoryDbService {
  private MAX_EVENTS: number = 10;

  createDb() {
    const events = [];

    for (let i = 0; i < this.MAX_EVENTS; i++) {
      events.push({
        id: i + 1,
        title: fake("{{name.title}}"),
        host: fake("{{company.companyName}}"),
        startTime: "11:00am",
        endTime: "11:00pm",
        venue: fake("{{address.city}}"),
        speaker: fake("{{name.title}}. {{name.firstName}} {{name.lastName}}"),
        description: fake("{{lorem.paragraph}}"),
        location: {
          name: fake("{{company.companyName}}"),
          coords: {
            lat: fake("{{address.latitude}}"),
            lon: fake("{{address.longitude}}")
          }
        }
      });
    }

    return { events };
  }
}
