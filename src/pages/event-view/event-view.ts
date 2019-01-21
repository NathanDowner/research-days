import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Event } from '../../models/Event';
import { JamnavProvider } from '../../providers/jamnav/jamnav';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  event: Event;
  location: Location;

  constructor(private navCtrl: NavController, private navParams: NavParams, private jamnav: JamnavProvider) {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewPage');

  }

  makeApiCall() {
    this.jamnav.getLocationData(this.event.venue)
      .subscribe(
        data => this.location = data, 
        error => console.log(`Error in receiving data: ${error}`)
      );
    console.log('made API call');
    console.log(this.location); 
  }

  findOnMap() {
    this.navCtrl.push(MapPage, {
      eventInfo: {
        title: this.event.title,
        lat: this.location.geometry.coordinates[1],
        lng: this.location.geometry.coordinates[0],
      }
    });
  }

}
