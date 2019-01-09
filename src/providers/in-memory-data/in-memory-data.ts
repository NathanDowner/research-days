import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()
export class InMemoryDataProvider implements InMemoryDbService {
  private MAX_EVENTS: number = 10;

  createDb() {
    const events = [];

    for (let i = 0; i < this.MAX_EVENTS; i++) {
      events.push({
        id: i + 1
      });
    }

    return { events };
  }
}
