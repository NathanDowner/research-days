import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//QR Plugin
//import { QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, /**private qrScanner: QRScanner**/) {
    //this.scanCode();
  }

  /**
   * @returns void
   */
  prepare(): void {

    //Grab references to the major elements
    this.video = document.getElementById("video") as HTMLVideoElement;
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.photo = document.getElementById("photo") as HTMLMediaElement;
    this.scanbutton = document.getElementById("scanbutton");

    // Getting user media stream
    navigator.mediaDevices.getUserMedia({video: true, audio:false}) // request video stream without audio
      .then((stream) => {
        this.video.srcObject = stream;  // assign video element source to stream object
        this.video.play()  // play video stream (might be short delay)
          .then(() => {console.log("Play triggered")});
      })
      .catch((err) => {
        console.log("Error: " + err);
      });


    // Configure Video object when actual video stream begins to flow
    this.video.addEventListener('canplay', (ev) => {  // Event listens for start of video stream flow
      if(!this.streaming){
        this.height = this.video.videoHeight / (this.video.videoWidth/this.width);

        // Configure dimensions of video and canvas objects (both will match)
        //this.video.setAttribute('width', String(this.width));
        this.video.setAttribute('height', String(this.height));
        this.canvas.setAttribute('width', String(this.width));
        this.canvas.setAttribute('height', String(this.height));

        this.streaming = true;
      }
    }, false);
  }


  /**
   * @returns void
   */
  getFrame(): void{
    let context = this.canvas.getContext('2d');  // get 2d drawing context
    if(this.width && this.height){  // is there a valid image on this frame?
      // set canvas dimensions to image video frame dimensions
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);  // draw frame of video to snapshot area

      let data = this.canvas.toDataURL('image/png');  // converts frame in canvas to image (png)
      this.photo.setAttribute('src', data);  // displays converted image in snapshot space
    } else {
      // clears canvas if frame is not valid (empty)
      this.clearSnapShot();
    }
  }


  /**
   * @returns void
   */
  clearSnapShot(): void{
    let context = this.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let data =  this.canvas.toDataURL('image/png');
    this.photo.setAttribute('src', data);
  }


  /**

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

   **/


  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanPage');
    this.prepare();
  }

}
