<<<<<<< HEAD
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MapPage } from "../map/map";
import { Event } from "../../models/Event";
=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Event } from '../../models/Event';
import { JamnavProvider } from '../../providers/jamnav/jamnav';
import { Location } from '../../models/location';
import { JamnavResponse } from '../../models/jamnavResponse';
>>>>>>> feature/007-jam-nav

@Component({
  selector: "page-event-view",
  templateUrl: "event-view.html"
})
export class EventViewPage {
<<<<<<< HEAD
  event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get("event");
  }

  findOnMap() {
    this.navCtrl.push(MapPage, {
      coords: this.event.coords
    });
  }
=======

  event: Event;
  location: Location;

  constructor(private navCtrl: NavController, private navParams: NavParams, private jamnav: JamnavProvider) {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewPage');
    this.makeApiCall(this.event.Venue);

  }

  makeApiCall(location: string) {
    this.jamnav.getLocationData(location)
      .subscribe(
        (data: JamnavResponse) => this.location = data.features[0], 
        error => console.log(`Error in receiving data: ${error}`)
      );
  }

  findOnMap() {
    this.navCtrl.push(MapPage, {
      eventInfo: {
        title: this.event.Type,
        lat: this.location.geometry.coordinates[1],
        lng: this.location.geometry.coordinates[0],
      }
    });
  }

>>>>>>> feature/007-jam-nav
}
