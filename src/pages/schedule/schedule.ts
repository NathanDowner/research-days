import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { EventViewPage } from "../event-view/event-view";
import { Event } from "../../models/event";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  events: Event[];
  filteredEvents: Event[];

  refineSearchFilter: any = {
    dates: [],
    faculty: "",
    department: "",
    venue: ""
  };

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
    if (this.isFiltering) {
      // reset the filter
      this.refineSearchFilter.dates = [];
      this.refineSearchFilter.faculty = "";
      this.refineSearchFilter.department = "";
      this.refineSearchFilter.venue = "";
    }
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
      this.isInField(event.venue, searchString) ||
      this.isInField(event.details, searchString)
    );
  }

  findEvents(): void {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filteredEvents = this.events.filter((event: Event) =>
      this.isInEvent(event, val)
    );
  }

  updateFilterDates(date: string): void {
    const idx = this.refineSearchFilter.dates.indexOf(date);
    console.log(date);
    console.log(idx);
    if (idx === -1) {
      this.refineSearchFilter.dates.push(date);
    } else {
      this.refineSearchFilter.dates.splice(idx, 1);
    }
  }

  filterEvents(filterObject: any): void {
    console.log(filterObject);
    let refinedResults: Event[] = this.events;

    // filter for dates
    if (filterObject.dates.length > 0) {
      if (filterObject.dates[0].toString().toLowerCase() === "all") {
        this.filteredEvents = this.events;
        return;
      } else if (filterObject.dates[0].toString().toLowerCase() === "today") {
        // get today's date in the format yyyy-mm-dd and replace the "today" string with it for later date comparisons
        const dt = new Date(Date.now());
        filterObject.dates[0] = this.formatDate(dt.toString());
      } else if (
        filterObject.dates[0].toString().toLowerCase() === "tomorrow"
      ) {
        // get today's date and add 1 to get tomorrow's date
        const dt = new Date(Date.now());
        dt.setDate(dt.getDate() + 1);

        // convert the date to the format yyyy-mm-dd and replace the "tomorrow" string with it for later date comparisons.
        filterObject.dates[0] = this.formatDate(dt.toString());
      }
      // apply each filter incrementally to the results array
      refinedResults = refinedResults.filter((event: Event) => {
        return filterObject.dates.indexOf(event.start_date) != -1;
      });
    }

    // filter for venue
    if (filterObject.venue && filterObject.venue.length > 0) {
      refinedResults = refinedResults.filter((event: Event) => {
        if (filterObject.venue) {
          return this.isInField(event.venue, filterObject.venue);
        }
        // if no filter for venue is specified just pass it
        return true;
      });
    }

    if (filterObject.faculty && filterObject.faculty.length > 0) {
      refinedResults = refinedResults.filter((event: Event) => {
        if (filterObject.faculty) {
          return this.isInField(event.faculty, filterObject.faculty);
        }
        // if no filter for faculty is specified just pass it
        return true;
      });
    }

    // filter for department
    if (filterObject.department && filterObject.department.length > 0) {
      refinedResults = refinedResults.filter((event: Event) => {
        if (filterObject.department) {
          return this.isInField(event.department, filterObject.department);
        }
        // if no filter for department is specified just pass it
        return true;
      });
    }

    this.filteredEvents = refinedResults;
  }

  private formatDate(date: string): string {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}
