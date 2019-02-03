// Native Components
import {Component, ViewChild} from "@angular/core";
import {NavController, ToastController, AlertController} from "ionic-angular";
import { Platform } from "ionic-angular";

//Providers
// import { PostersProvider } from "../../providers/posters/posters";

//Barcode format
import BarcodeFormat from "@zxing/library/esm5/core/BarcodeFormat";

//Scanner Component
import {ZXingScannerComponent} from "@zxing/ngx-scanner";

// InAppBrowser
import {InAppBrowser, InAppBrowserObject} from "@ionic-native/in-app-browser";


@Component({
  selector: "page-qr-reader",
  templateUrl: "qr-reader.html"
})
export class QrReaderPage {

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  // Scanner Information
  allowedFormats: BarcodeFormat[];        // formats the scanner is allowed to detect
  result: string;                         // stores decoded qr scan result
  hasCameras: boolean;                    // does the device have cameras? unknown (false) at first
  availableDevices: MediaDeviceInfo[];    // stores all available cameras for scanner
  selectedDevice: MediaDeviceInfo;        // selected device to carry out scanning
  hasPermission: boolean;                 // has the user given permission to use the camera?
  scannerEnabled: boolean;                // Should scanning be going on?
  autofocus: boolean;                     // should the scanner use autofocus on the selected device

  // Dimensions
  width: string;                          // width of scanner camera preview space
  height: string;                         // width of scanner camera preview space

  // In-App Browser
  browser: InAppBrowserObject;

  // Device
  is_iOS: boolean;


  /**
   * Constructor
   * @param navCtrl
   * @param iab
   * @param posters
   * @param platform
   * @constructor
   */
  constructor(public navCtrl: NavController, private iab: InAppBrowser, private platform: Platform, private alert: AlertController) {
    this.allowedFormats = [BarcodeFormat.QR_CODE];
    this.hasCameras = false;
    this.scannerEnabled = false;
    this.autofocus = true;
    this.width = innerWidth.toString();
    this.height = innerHeight.toString();

    this.is_iOS = this.platform.is("ios");
    console.log("iOS: ", this.is_iOS);
  }


  /**
   * Searches for usable cameras, selects an appropriate device and
   * authorizes scanning based on user permissions
   */
  prepare(): void {

    console.log("Camera's Found?");
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;  // The device has cameras
      this.availableDevices = devices;  // all available devices stored in this variable
      // alert(devices.length);
      if(devices.length !== 0){

        // selects the devices's back camera by default
        for (const device of devices) {
          console.log(device.label);
          if (/back|rear|environment/gi.test(device.label)) {
            this.scanner.changeDevice(device);  // changes device the scanner uses
            this.selectedDevice = device;
            break;
          }
        }

        // selects first available device if no back camera found
        if(!this.selectedDevice){
          this.selectedDevice = this.availableDevices[0];
        }
      } else {
        alert("NO DEVICES!!");
      }
      console.log(this.selectedDevice);
      console.log(devices);
      this.hasDevice();
    }, () => { document.getElementById("overlay").style.visibility = "hidden";});
  }

  hasDevice(): void {
    this.scanner.hasDevices.subscribe((status) => {
      // alert(status);
      console.log("Has device: ", status);
    });
    console.log(this.scanner.hasDevices);
  }


  /** stores user permission response */
  checkPermission(): void {
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
      console.log("Permission: " + this.hasPermission);
      this.scannerEnabled = this.hasPermission;
      // this.restartScan();
    }, () => { document.getElementById("overlay").style.visibility = "hidden";});
  }


  /** stops current scanner */
  stopScanning(): void {
    this.scanner.resetCodeReader();
  }

  /** restarts current scan and starts again used to explicitly renew scanner to
   * reflect changes in 'scannerEnabled' */
  restartScan(): void {
    this.scanner.restartScan();
  }


  /** Sets size of scanner on page - fills by default */
  setSize(): void {
    document.getElementById("scanner").style.height = this.height;
    document.getElementById("scanner").style.width = this.width;
  }


  /**
   * actions performed after QR scan result is obtained
   * @param resultStr {string} - decoded string result from qr code
   */
  handleScan(resultStr: string): void {
    let target: string = "_self";
    const options: string = "location=yes";
    this.result = resultStr;
    this.stopScanning();

    // Regular JS implementation
    window.open(this.result, target);

    // InAppBrowser
    // this.browser = this.iab.create(this.result, target, options);

    console.log(this.result);
    // alert(this.result);
  }




  /** Unsub to all async processes */
  unsub(): void {
    this.scanner.camerasFound.unsubscribe();
    this.scanner.permissionResponse.unsubscribe();
  }

  /** TO BE performed after page loads */
  ionViewDidLoad(): void {
    console.log("IonViewDidLoad Qr Reader page");
    this.setSize();
    this.prepare();
    this.checkPermission();
    this.showAlert();
    
  }

  showAlert() {
    this.alert.create({
      title: "Please Note!",
      subTitle: "The QR Scanner may not work on IOS and older devices",
      buttons: ['OK']
    }).present();
  }


  /** TO BE preformed every time this page is entered */
  ionViewWillEnter(): void {
    console.log("IonViewWillEnter Qr Reader page");
    this.restartScan();
  }


  /** TO BE performed before page is exited */
  ionViewWillLeave(): void {
    console.log("IonViewWillLeave Qr Reader page");
    this.stopScanning();  // stops current scanner
  }


  /** TO BE performed after page is exited */
  // ionViewDidLeave(): void {
  //   console.log("IonViewDidLeave Qr Reader page");
  //   alert("IonViewDidLeave Qr Reader page");
  //   this.stopScanning();
  // }
}
