import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrReaderPage } from './qr-reader';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    QrReaderPage
  ],
  imports: [
    IonicPageModule.forChild(QrReaderPage),
    ZXingScannerModule
  ],
  exports: [
    QrReaderPage
  ]
})

export class QrReaderPageModule {}