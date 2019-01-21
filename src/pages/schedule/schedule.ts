import { Component, ViewChild } from "@angular/core";
import { NavController, ModalController, Searchbar } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";
import { EventSearchPage } from "../event-search/event-search";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  @ViewChild("searchbar") searchbar: Searchbar;

  events: Event[];
  filteredEvents: Event[];

  isSearching: boolean = false;
  isFiltering: boolean = false;
  searchTerm: string;

  dateFilters: any[] = [
    "All",
    "Today",
    "Tomorrow",
    "Feb 9",
    "Feb 10",
    "Feb 11"
  ];

  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.getEvents();
  }

  showSearchPage(): void {
    let eventSearchModal = this.modalCtrl.create(EventSearchPage, {
      events: this.events
    });
    eventSearchModal.present();
  }

  showEventPage(event: Event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe(events => {
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

  showFilterOptions(): void {
    this.toggleIsFiltering();
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 600);
  }

  showFilters(): void {
    this.toggleIsSearching();
  }

  filterEvents(filter: string): void {
    console.log(filter);
  }

  inField(field: any, value: string): boolean {
    return (
      field
        .toString()
        .toLowerCase()
        .indexOf(value.toLowerCase()) > -1
    );
  }

  isInEvent(event: Event, searchString: string): boolean {
    return (
      this.inField(event.title, searchString) ||
      this.inField(event.researcher_name, searchString) ||
      this.inField(event.location.name, searchString) ||
      this.inField(event.abstract, searchString)
    );
  }

  findEvents(): void {
    let val = this.searchTerm;
    // if the value is an empty string don't filter the items
    this.filteredEvents = this.events.filter((item: Event) =>
      this.isInEvent(item, val)
    );
  }
}
