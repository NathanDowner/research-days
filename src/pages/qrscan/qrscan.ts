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

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
    this.scanCode();
  }

  scanCode(){
    //camera permission request
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized){
          //camera permission granted
          console.log("PERMISSION GRANTED HAHAHAHAH");

          //begin scanning
          let scanSub = this.qrScanner.scan().subscribe((text: String) => {
            console.log("Scanned Something", text);

            // show camera preview
            this.qrScanner.show().then((status) => {
              console.log("Preview visible");
            });

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

}
