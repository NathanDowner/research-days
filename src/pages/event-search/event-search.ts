import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

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

  showEventPage(event: Event): void {
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
      this.inField(item.researcher_name, value) ||
      this.inField(item.location.name, value) ||
      this.inField(item.abstract, value)
    );
  }

  findEvents(): void {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filteredEvents = this.navParams
      .get("events")
      .filter((item: Event) => this.isInEvent(item, val));
  }
}
