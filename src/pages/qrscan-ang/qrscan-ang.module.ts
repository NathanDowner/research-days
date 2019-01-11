import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrscanAngPage } from './qrscan-ang';

@NgModule({
  declarations: [
    QrscanAngPage,
  ],
  imports: [
    IonicPageModule.forChild(QrscanAngPage),
  ],
})
export class QrscanAngPageModule {}
