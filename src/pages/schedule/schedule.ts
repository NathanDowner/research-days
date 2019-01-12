import { Component} from "@angular/core";
import { NavController} from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {

  isSearching: boolean = false;
  events: Event[];
  filterEvents: Event[];
  searchTerm: string;
  day1: Event[] = [];
  day2: Event[] = [];
  day3: Event[] = [];
  day:string = "all";

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider
  ) {}

  ionViewDidLoad() {
    this.getEvents();
  }

  toggleSearch() {
    // this.modalCtrl.create(SearchPage, {
    //   events: this.events
    // }).present();
    this.isSearching = !this.isSearching;
    if (this.isSearching) {
      // this.searchbar.setFocus();
    }
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

  /**
   * 
   * @param param 
   * @param val 
   */
  inField(param:any, val: string): boolean {

    return (param.toString().toLowerCase().indexOf(val.toLowerCase()) > -1)
  }

  stub(item: Event, val: string): boolean {
    return this.inField(item.title, val) || 
    this.inField(item.speaker, val) ||
    this.inField(item.venue, val)
  }

  findEvents() {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filterEvents = this.events.filter((item) => this.stub(item, val));
  }
}
