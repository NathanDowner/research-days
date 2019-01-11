import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  @ViewChild("map") mapElement;
  map: google.maps.Map;
  center: google.maps.LatLng = new google.maps.LatLng(18.006168, -76.746955);
  eventLoc: google.maps.LatLng = new google.maps.LatLng(18.006168, -76.746955);
  deviceLocation: google.maps.LatLng;


  constructor(private navParams: NavParams) {}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    
    this.initMap();
    this.getDeviceLocation();
  }
  
  getEventLoc() {
    let coords = this.navParams.get('coords');
    let lat = coords.lat;
    let lng = coords.lng;
    return new google.maps.LatLng(lat, lng);
  }
  
  getDeviceLocation() {
    this.deviceLocation = this.center; //should be actual device location
    
  }
  

  
  initMap() {
    let coords = this.center;
    let mapOptions = {
      center: coords,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: this.eventLoc,
      label: "Research Days"
    });
  }
}


