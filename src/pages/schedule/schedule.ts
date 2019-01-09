import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage implements OnInit {
  private events: Event[];

  constructor(
    public navCtrl: NavController,
    private eventsProvider: EventsProvider
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe(events => (this.events = events));
  }
}
