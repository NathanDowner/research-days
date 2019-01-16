import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

@IonicPage()
@Component({
  selector: "page-event-search",
  templateUrl: "event-search.html"
})
export class EventSearchPage {
  filteredEvents: Event[];
  searchTerm: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.filteredEvents = this.navParams.get("events");
  }

  cancelSearch() {
    this.navCtrl.pop();
  }

  showEventPage(event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  inField(field: any, value: string): boolean {
    return (
      field
        .toString()
        .toLowerCase()
        .indexOf(value.toLowerCase()) > -1
    );
  }

  isInEvent(item: Event, value: string): boolean {
    return (
      this.inField(item.title, value) ||
      this.inField(item.speaker, value) ||
      this.inField(item.venue, value)
    );
  }

  findEvents() {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filteredEvents = this.navParams
      .get("events")
      .filter(item => this.isInEvent(item, val));
  }
}
