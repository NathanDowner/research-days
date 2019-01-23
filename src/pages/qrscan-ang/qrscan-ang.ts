import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import {QrScannerComponent} from "angular2-qrscanner";

/**
 * Generated class for the QrscanAngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qrscan-ang',
  templateUrl: 'qrscan-ang.html',
  encapsulation: ViewEncapsulation.None,
})
export class QrscanAngPage {

  width: string;
  height: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  prepare() {
    this.qrScannerComponent.getMediaDevices().then(devices => {  // receive all user media devices
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        alert(device.kind.toString() + " " + device.label.toString());
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0){
        let chosenDev;
        for (const dev of videoDevices){
          if (dev.label.toLowerCase().includes('back')){
            chosenDev = dev;
            break;
          }
        }
        alert(chosenDev);
        // choose camera device to be used
        if (chosenDev) {
          this.qrScannerComponent.chooseCamera.next(chosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.width = innerWidth.toString();
    this.height = innerHeight.toString();

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
