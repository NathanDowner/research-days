import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";
import { EventSearchPage } from "../event-search/event-search";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  events: Event[];

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.getEvents();
  }

  showSearchPage() {
    let eventSearchModal = this.modalCtrl.create(EventSearchPage, {
      events: this.events
    });
    eventSearchModal.present();
  }

  showEventPage(event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe(events => {
      this.events = events;
    });
  }
}
