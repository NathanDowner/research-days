import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//QR Plugin
import { QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

/**
 * Generated class for the QrscanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscan',
  templateUrl: 'qrscan.html',
})
export class QrscanPage {

  width: number = 320;  // resulting snapshot width
  height: number = 0;  // video input stream height (to be computed)

  streaming: boolean = false; //Is there an active stream?

  video: HTMLVideoElement = null;  // reference to video input stream (<video> element)
  canvas: HTMLCanvasElement = null;  // reference to canvas used to store snapshots (<canvas> element)
  photo: HTMLMediaElement = null;  // reference to the output image from scan (<img> element)
  scanbutton: HTMLElement = null;  // reference to button that initiates scan (<button> element)

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
    //this.scanCode();
  }

  /**
   * @returns void
   */
  scanCode(){
    //camera permission request
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized){
          //camera permission granted
          console.log("PERMISSION GRANTED");
          //window.document.querySelector('ion-app').classList.add('transparentBody');

          // show camera preview
          this.qrScanner.show().then((status) => {
            console.log("Preview visible");
          });

          //begin scanning
          let scanSub = this.qrScanner.scan().subscribe((text: String) => {
            console.log("Scanned Something", text);

            scanSub.unsubscribe(); // stop scanning
          });

        }else if(status.denied){
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log("Permission denied PERM");
          this.qrScanner.openSettings();
        }else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log("PERM denied TEMP");
        }
      })
      .catch((e: any) => console.log("Theeee Error: ", e));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanPage');
  }

  ionViewDidEnter(){
    this.scanCode();
  }

}
