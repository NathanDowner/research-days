import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { SchedulePage } from "../pages/schedule/schedule";
import { QrReaderPage } from "../pages/qr-reader/qr-reader";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { TabsPage } from "../pages/tabs/tabs";
import {QrscanPage} from "../pages/qrscan/qrscan";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { EventsProvider } from "../providers/events/events";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataProvider } from "../providers/in-memory-data/in-memory-data";
import { HttpClientModule } from "@angular/common/http";

//plugins
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    QrscanPage,
    SchedulePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataProvider, {
      dataEncapsulation: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    QrReaderPage,
    HomePage,
    QrscanPage,
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
    InMemoryDataProvider
  ]

})
export class AppModule {}
