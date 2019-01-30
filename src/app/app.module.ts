import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

//Other
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Geolocation } from "@ionic-native/geolocation";

import { EventsProvider } from "../providers/events/events";
import { HttpClientModule } from "@angular/common/http";
import { JamnavProvider } from '../providers/jamnav/jamnav';

//plugins
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { NgQrScannerModule } from "angular2-qrscanner";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PostersProvider } from '../providers/posters/posters';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgQrScannerModule,
    ZXingScannerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsProvider,
    Geolocation,
    JamnavProvider,
    InAppBrowser,
    PostersProvider,
  ]

})
export class AppModule {}
