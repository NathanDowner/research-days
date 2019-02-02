import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import {CacheModule} from "ionic-cache-observable";
import {IonicStorageModule} from "@ionic/storage";

// Pages
import { SchedulePage } from "../pages/schedule/schedule";
import { QrReaderPage } from "../pages/qr-reader/qr-reader";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { TabsPage } from "../pages/tabs/tabs";
import { EventViewPage } from "../pages/event-view/event-view";


//Other
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Geolocation } from "@ionic-native/geolocation";

import { EventsProvider } from "../providers/events/events";
import { HttpClientModule } from "@angular/common/http";
import { JamnavProvider } from '../providers/jamnav/jamnav';

//plugins
import { QRScanner } from "@ionic-native/qr-scanner";
import { NgQrScannerModule } from "angular2-qrscanner";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    SchedulePage,
    TabsPage,
    EventViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CacheModule,
    HttpClientModule,
    NgQrScannerModule,
    ZXingScannerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    SchedulePage,
    TabsPage,
    EventViewPage
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
    InAppBrowser
  ]

})
export class AppModule {}
