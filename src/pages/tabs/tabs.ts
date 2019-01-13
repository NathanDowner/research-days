import { Component } from "@angular/core";

import { MapPage } from "../map/map";
import { SchedulePage } from "../schedule/schedule";
import { QrReaderPage } from "../qr-reader/qr-reader";
import { HomePage } from "../home/home";
import {QrscanPage} from "../qrscan/qrscan";
import {QrscanAngPage} from "../qrscan-ang/qrscan-ang";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = QrReaderPage;
  tab4Root = SchedulePage;

  constructor() {}
}
