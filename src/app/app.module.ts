import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

// Pages
import { SchedulePage } from "../pages/schedule/schedule";
import { QrReaderPage } from "../pages/qr-reader/qr-reader";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { TabsPage } from "../pages/tabs/tabs";
import { QrscanPage } from "../pages/qrscan/qrscan";
import { QrscanAngPage } from "../pages/qrscan-ang/qrscan-ang";

//Other
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { EventsProvider } from "../providers/events/events";
import { HttpClientModule } from "@angular/common/http";

//plugins
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { NgQrScannerModule } from "angular2-qrscanner";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PostersProvider } from '../providers/posters/posters';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    QrscanPage,
    QrscanAngPage,
    SchedulePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgQrScannerModule,
    ZXingScannerModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    QrscanPage,
    QrscanAngPage,
    SchedulePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsProvider,
    InAppBrowser,
    PostersProvider,
  ]

})
export class AppModule {}
