import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('popup') popup: ElementRef;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.popup.nativeElement.style.display = 'block';
    }, 2000);

    setTimeout(()=> this.hidePopup(), 5000);
  }

  hidePopup() {
    console.log('clicked fab')
    this.popup.nativeElement.style.display = 'none';
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

