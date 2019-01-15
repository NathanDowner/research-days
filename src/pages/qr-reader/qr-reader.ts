import {Component, ViewChild} from "@angular/core";
import {NavController} from "ionic-angular";

//Barcode format
import BarcodeFormat from "@zxing/library/esm5/core/BarcodeFormat";

//Scanner Component
import {ZXingScannerComponent} from "@zxing/ngx-scanner";


@Component({
  selector: "page-qr-reader",
  templateUrl: "qr-reader.html"
})
export class QrReaderPage {

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  // Scanner Information
  allowedFormats: BarcodeFormat[];        // formats the scanner is allowed to detect
  result: String;                         // stores decoded qr scan result
  hasCameras: boolean;                    // does the device have cameras? unknown (false) at first
  availableDevices: MediaDeviceInfo[];    // stores all available cameras for scanner
  selectedDevice: MediaDeviceInfo;        // selected device to carry out scanning
  hasPermission: boolean;                 // has the user given permission to use the camera?
  scannerEnabled: boolean;                // Should scanning be going on?
  autofocus: boolean;                     // should the scanner use autofocus on the selected device

  //Dimensions
  width: string;                          // width of scanner camera preview space
  height: string;                         // width of scanner camera preview space


  /**
   * Constructor
   * @param navCtrl
   * @constructor
   */
  constructor(public navCtrl: NavController) {
    this.allowedFormats = [BarcodeFormat.QR_CODE];
    this.hasCameras = false;
    this.scannerEnabled = false;
    this.autofocus = true;
    this.width = innerWidth.toString();
    this.height = innerHeight.toString();
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

      console.log(this.selectedDevice);
      console.log(devices);
    });
  }


  /** stores user permission response */
  checkPermission(): void {
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
      console.log("Permission: " + this.hasPermission);
      this.scannerEnabled = this.hasPermission;
      // this.restartScan();
    });
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
    this.result = resultStr;
    console.log(this.result);
    alert(this.result);
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
