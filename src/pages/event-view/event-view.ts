import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Event } from '../../models/Event';

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewPage');
  }

  findOnMap() {
    this.navCtrl.push(MapPage, {
      coords: this.event.location.coords
    })
  }

}
