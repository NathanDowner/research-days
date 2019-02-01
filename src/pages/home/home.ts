import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToSchedule() {
    this.navCtrl.parent.select(3);
  }

  openInsta() {
    window.open('https://www.instagram.com', '_system');
  }

  openFb() {
    window.open('https://www.facebook.com', '_system');
  }
}

