import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrReaderPage } from './qr-reader';


@NgModule({
  declarations: [
    QrReaderPage
  ],
  imports: [
    IonicPageModule.forChild(QrReaderPage)
  ],
  exports: [
    QrReaderPage
  ]
})

export class QrReaderPageModule {}