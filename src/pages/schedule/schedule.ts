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
    this.eventsProvider.getEvents().subscribe(events => (this.events = events));
  }
}
