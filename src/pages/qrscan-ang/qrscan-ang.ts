import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {QrScannerComponent} from "angular2-qrscanner";

/**
 * Generated class for the QrscanAngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscan-ang',
  templateUrl: 'qrscan-ang.html',
  encapsulation: ViewEncapsulation.None,
})
export class QrscanAngPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  prepare() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        alert(device.kind.toString() + " " + device.label.toString());
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0){
        let choosenDev;
        for (const dev of videoDevices){
          if (dev.label.toLowerCase().includes('back')){
            choosenDev = dev;
            break;
          }
        }
        alert(choosenDev);
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    // this.qrScannerComponent.videoElement.setAttribute('playsinline', 'true')

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      alert(result);
      this.restart();
    });
  }

  restart(): void {
    this.qrScannerComponent.stopScanning();
    this.qrScannerComponent.startScanning(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanAngPage');
    alert("Hello");
    this.prepare();
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave QrscanAngPage');
    this.qrScannerComponent.stopScanning();
    this.qrScannerComponent.capturedQr.unsubscribe();
  }

  ionViewDidEnter() {
    this.qrScannerComponent.startScanning(null);
  }

}
