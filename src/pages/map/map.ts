import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavParams, Platform, Toast, ToastController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  @ViewChild("map") mapElement: ElementRef;
  map: google.maps.Map;
  center: google.maps.LatLng = new google.maps.LatLng(18.006168, -76.746955);
  eventLoc: google.maps.LatLng = null;//new google.maps.LatLng(18.006168, -76.746955);
  deviceLocation: google.maps.LatLng;


  constructor(private navParams: NavParams, private geoLoc: Geolocation, private plt: Platform, private toast: ToastController) {}
  
  ionViewDidLoad() {
    this.plt.ready().then(_ => {
      this.initMap();
      this.getDeviceLocation();
    })
    console.log('ionViewDidLoad MapPage');
    
    
  }
  
  getEventLoc() {
    let coords = this.navParams.get('coords');
    if (!coords) {
      return null;
    } else {
      let lat = coords.lat;
      let lng = coords.lng;
      return new google.maps.LatLng(lat, lng);
    }
  }
  
  getDeviceLocation() {
    this.deviceLocation = this.center; //should be actual device location
  }

  showToast(coords: {}) {
    this.toast.create( {
      message: `your coords: ${coords}`,
      duration: 2000
    }).present();
  }
  
  initMap() {

    this.eventLoc = this.getEventLoc();

    let coords = this.center;
    let mapOptions = {
      // center: this.eventLoc ? this.eventLoc: coords,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.geoLoc.getCurrentPosition({enableHighAccuracy: true}).then(pos => {
      let userPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      this.map.setCenter(userPos);
      this.showToast(userPos);
    })

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: this.getEventLoc(),
      label: "Research Days"
    });
  }
}


