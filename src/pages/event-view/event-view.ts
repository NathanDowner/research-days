import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Event } from '../../models/event';
import { JamnavProvider } from '../../providers/jamnav/jamnav';
import { Location } from '../../models/location';
import { JamnavResponse } from '../../models/jamnavResponse';

@Component({
  selector: "page-event-view",
  templateUrl: "event-view.html"
})
export class EventViewPage {

  event: Event;
  location: Location;

  constructor(private navCtrl: NavController, private navParams: NavParams, private jamnav: JamnavProvider) {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewPage');
    this.makeApiCall(this.event.venue);

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
        title: this.event.type,
        lat: this.location.geometry.coordinates[1],
        lng: this.location.geometry.coordinates[0],
      }
    });
  }

}
