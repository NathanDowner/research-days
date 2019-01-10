import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { EventsProvider } from "../../providers/events/events";
import { Event } from "../../models/event";
import { EventViewPage } from "../event-view/event-view";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {
  private events: Event[];
  private day1: Event[] = [];
  private day2: Event[] = [];
  private day3: Event[] = [];


  constructor(
    private navCtrl: NavController,
    private eventsProvider: EventsProvider, private toast: ToastController
  ) {}

  /**
   * The ionic version of the ngOnInit life cycle hook
   */
  ionViewDidLoad() {
    this.getEvents();
  }

  daySort(events: Event[]): void {
    events.forEach(e => {
      switch(e.day) {
        case 1:
          this.day1.push(e); break;
        case 2:
          this.day2.push(e); break;
        case 3:
          this.day3.push(e); break;
      }
    });
    console.log(this.day1, this.day2, this.day3);
  }
  /**
   * Shows what teh value of each event's day is as a pop up at the bottom of the screen
   * @param event 
   */
  showToast(event) {
    this.toast.create({
      message: `Day is day:${event.day}`,
      duration: 1500}).present();
  }

  showEventPage(event) {
    this.navCtrl.push(EventViewPage, {
      event: event
    });
  }

  getEvents(): void {
    this.eventsProvider.getEvents().subscribe(events => (this.events = events));
    console.log('got the events');
    
  }
}
