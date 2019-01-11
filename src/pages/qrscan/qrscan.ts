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

  ionApp = document.getElementsByTagName("ion-app")[0];

  width: number = 320;  // resulting snapshot width
  height: number = 0;  // video input stream height (to be computed)

  streaming: boolean = false;  // Is there an active stream?
  destroyed: boolean = false;  // Is the scanning instance destroyed?

  scanSub = null;

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
    let back: number = 0;
    let front: number = 1;

    //camera permission request
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized){
          //camera permission granted
          console.log("PERMISSION GRANTED");

          // console.log("Showing? ", status.showing);
          //
          // console.log("Preview? ", status.previewing);

          this.qrScanner.useCamera(back).then();  // Select camera to use (Default = back | 0 )

          // this.showCam();  // Show camera preview

          //begin scanning
          this.scanSub = this.qrScanner.scan().subscribe((text: String) => {
            console.log("Scanned Something", text);

            this.hideCam();  // hide camera preview

            this.scanSub.unsubscribe(); // stop scanning
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
      .catch((e: any) => console.log("Error: ", e));
  }

  showCam(): void {
    // show camera preview
    this.qrScanner.show().then((status) => {
      console.log("Preview visible: ", status);
    })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  hideCam (): void {
    // hide camera preview
    this.qrScanner.hide().then((status) => {
      console.log("Preview Hidden ", status);
    })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  /**
   *
   * @param status
   */
  cameraView(status: boolean): void {
    if(status){
      this.ionApp.classList.add('cameraView');
      // window.document.querySelector('ion-app').classList.add('cameraView');
    } else {
      this.ionApp.classList.remove('cameraView');
      // window.document.querySelector('ion-app').classList.remove('cameraView');
    }
  }

  destroy(): void {
    this.scanSub.unsubscribe();
    this.hideCam();

    // scanner instance destroyed using destroy()
    this.qrScanner.destroy().then((status: QRScannerStatus) => {
      this.cameraView(false);
      this.destroyed = true;
      console.log("Destroyed, status: ", status);
    })
      .catch((e: any) => {
        this.destroyed = false;
        console.log("Error: ", e);
      });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter QrscanPage');
    this.cameraView(true);
    this.scanCode();
  }

  ionViewWillLeave(){

    console.log('ionViewWillLeave QrscanPage');
    //this.qrScanner.destroy().then((s) => { console.log("DESTROY")}).catch((e) => { console.log("Error: ", e)});
    // this.qrScanner = null;
    this.destroy();
  }

  ionViewCanLeave(): Boolean {
    console.log("ionViewCanLeave QrscanPage?");
    return this.destroyed;
  }


}
