import {Component, ViewChild} from "@angular/core";
import {NavController} from "ionic-angular";

//Barcode format
import BarcodeFormat from "@zxing/library/esm5/core/BarcodeFormat";

//Scanner Component
import { Result } from '@zxing/library';
import {ZXingScannerComponent} from "@zxing/ngx-scanner";



@Component({
  selector: "page-qr-reader",
  templateUrl: "qr-reader.html"
})
export class QrReaderPage {

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  // Scanner Information
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];  // formats the scanner is allowed to detect
  result: String;                           // stores decoded qr scan result
  hasCameras: boolean = false;              // does the device have cameras? unknown (false) at first
  availableDevices: MediaDeviceInfo[];      // stores all available cameras for scanner
  selectedDevice: MediaDeviceInfo;          // selected device to carry out scanning
  hasPermission: boolean;                   // has the user given permission to use the camera?
  autofocus: boolean = true;                // should the scanner use autofocus on the selected device

  //Dimensions
  width: string = innerWidth.toString();    // width of scanner camera preview space
  height: string = innerHeight.toString();  // width of scanner camera preview space

  /**
   * Constructor
   * @param navCtrl
   * @constructor
   */
  constructor(public navCtrl: NavController) {}


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
              this.scanner.changeDevice(device);
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

    // stores user permission response
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

  }

  /**
   * Sets size of scanner on page - fills by default
   */
  setSize(): void {
    // sets size of
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


  /**
   * TO BE performed after page loads
   */
  ionViewDidLoad(): void {
    this.setSize();
    this.prepare();
  }
}
