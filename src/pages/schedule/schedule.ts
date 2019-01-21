import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { EventViewPage } from "../event-view/event-view";
import { Event } from "../../models/event";
import { Filter } from "../../models/filter";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  events: Event[];
  filteredEvents: Event[];

  isSearching: boolean = false;
  isFiltering: boolean = false;
  searchTerm: string;

  dateFilters: string[] = [
    "All",
    "Today",
    "Tomorrow",
    "2019-02-06",
    "2019-02-07",
    "2019-02-08"
  ];

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider
  ) {}

  ionViewDidLoad() {
    this.getEvents();
  }

  ionViewWillEnter() {
    this.isSearching = false;
    this.isFiltering = false;
  }

  showEventPage(event: Event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  toggleIsSearching(): void {
    this.isSearching = !this.isSearching;
  }

  toggleIsFiltering(): void {
    this.isFiltering = !this.isFiltering;
  }

  isInField(field: any, value: string): boolean {
    return (
      field
        .toString()
        .toLowerCase()
        .indexOf(value.toLowerCase()) > -1
    );
  }

  isInEvent(event: Event, searchString: string): boolean {
    return (
      this.isInField(event.title, searchString) ||
      this.isInField(event.researcher_name, searchString) ||
      this.isInField(event.location.name, searchString) ||
      this.isInField(event.abstract, searchString)
    );
  }

  findEvents(): void {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filteredEvents = this.events.filter((event: Event) =>
      this.isInEvent(event, val)
    );
  }

  filterEvents(filterObject: Filter): void {
    let dateFilter: any;

    if (filterObject.date.toString().toLowerCase() === "all") {
      this.filteredEvents = this.events;
      return;
    } else if (filterObject.date === "today") {
      // overwrite the "today" string with a date string of the current date
      const dt = new Date(Date.now());
      filterObject.date = dt.toString();
    } else if (filterObject.date.toString().toLowerCase() === "tomorrow") {
      const dt = new Date(Date.now());
      dt.setDate(dt.getDate() + 1);
      filterObject.date = dt.toString();
    }
    // apply each filter incrementally to the results array
    this.filteredEvents = this.events.filter((event: Event) => {
      console.log(filterObject.date);
      return (
        new Date(new Date(event.date).toString()).toString() ===
        new Date(new Date(filterObject.date.toString()).toString()).toString()
      );
    });
  }
}
