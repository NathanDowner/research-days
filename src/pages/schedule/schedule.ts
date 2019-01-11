import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage implements OnInit {
  private events: Event[];
  filterEvents: Event[];
  private searchTerm: string;

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider
  ) {}

  ngOnInit(): void {
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
