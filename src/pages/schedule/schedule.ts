import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  events: Event[];
  filterEvents: Event[];
  searchTerm: string;
  day1: Event[] = [];
  day2: Event[] = [];
  day3: Event[] = [];
  day:string = "day1";

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider
  ) {}

  ionViewDidLoad() {
    this.getEvents();
  }

  showEventPage(event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe(events => {
      this.events = events;
      this.filterEvents = events;
    });
  }

  findEvents() {
    // if the value is an empty string don't filter the items
    this.filterEvents = this.events.filter(event => {
      return (
        event.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      );
    });
  }
}
