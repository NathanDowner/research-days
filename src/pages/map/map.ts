import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform, ToastController, NavParams } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";


@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  map: google.maps.Map;
  @ViewChild('map') mapRef: ElementRef;

  constructor(private geoLoc: Geolocation, private plt: Platform, private toast: ToastController, private navParams: NavParams) {}

  ionViewDidLoad() {
    this.plt.ready().then(_ => {
      // this.prepareBrowser();
      this.loadMap();
      
    })
    console.log('ionViewDidLoad MapPage');
    
  }

  loadMap() {

    //location
    const location = new google.maps.LatLng(18.006168,-76.746955);

    const options = {
      center: location,
      zoom: 12
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    
    //get user location
    
    this.geoLoc.getCurrentPosition({enableHighAccuracy: true}).then(pos =>{



    }).catch((error) => {
      console.log('Error getting location', error);
    });
    //for event being passed
        let evInfo = this.navParams.get('eventInfo');
        if (evInfo) {
          
  


        }

  
  // initMap() {

  //   let locOpts = {enableHighAccuracy: true};
  //   this.geoLoc.getCurrentPosition(locOpts).then(pos => {
  //     let userPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  //     // this.map.setCenter(userPos);
  //     this.showToast(userPos);
  //   })
  // }
  }

}