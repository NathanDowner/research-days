import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EventSearchPage } from "./event-search";

@NgModule({
  declarations: [EventSearchPage],
  imports: [IonicPageModule.forChild(EventSearchPage)]
})
export class EventSearchPageModule {}
