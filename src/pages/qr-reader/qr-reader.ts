import {Component, ViewChild} from "@angular/core";
import {NavController} from "ionic-angular";

//Scanner Component
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import { Result } from '@zxing/library';

//Barcode format
import BarcodeFormat from "@zxing/library/esm5/core/BarcodeFormat";


@Component({
  selector: "page-qr-reader",
  templateUrl: "qr-reader.html"
})
export class QrReaderPage {

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  result: String;
  hasCameras: boolean = false;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  hasPermission: Boolean;


  constructor(public navCtrl: NavController) {}


  debug(): void {

    console.log("Camera's Found?");
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
        console.log(device.label);
          if (/back|rear|environment/gi.test(device.label)) {
              this.scanner.changeDevice(device);
              this.selectedDevice = device;
              break;
          }
      }
      console.log(devices);
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

  }

  handleScan(resultStr: string): void {
    console.log(resultStr);
  }



  ionViewDidLoad(): void {
    this.debug();
    // this.scanner.
  }
}
