import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { SchedulePage } from "../pages/schedule/schedule";
import { QrReaderPage } from "../pages/qr-reader/qr-reader";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Geolocation } from "@ionic-native/geolocation";

import { EventsProvider } from "../providers/events/events";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataProvider } from "../providers/in-memory-data/in-memory-data";
import { HttpClientModule } from "@angular/common/http";
import { EventViewPage } from "../pages/event-view/event-view";
import { GoogleMaps } from "@ionic-native/google-maps";

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
    SchedulePage,
    TabsPage,
    EventViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventsProvider,
    InMemoryDataProvider,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
