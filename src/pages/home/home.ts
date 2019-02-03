import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('popup') popup: ElementRef;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.popup.nativeElement.style.display = 'block';
    }, 2000);
  }

  hidePopup() {
    console.log('clicked fab')
    this.popup.nativeElement.style.display = 'none';
  }

  goToSchedule() {
    this.navCtrl.parent.select(3);
  }

  openInsta() {
    window.open('https://www.instagram.com/UWIRESEARCHDAYS/', '_system');
  }

  openFb() {
    window.open('https://www.facebook.com/UWIMonaResearchDays/', '_system');
  }
  
  openYoutube() {
    window.open('https://www.youtube.com/channel/UCmmxtHS8__As0wUsA6c-E6g/featured', '_system');
  }
}

