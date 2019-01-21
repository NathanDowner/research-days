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
    this.addMarker(location, "Map Center!")
    //get user location
    
    if (navigator.geolocation) {

      navigator.geolocation.watchPosition(
        (pos) => {
          let lat = pos.coords.latitude;
          let lng = pos.coords.longitude;

          this.addMarker(new google.maps.LatLng(lat, lng), "your location");
        }
      );
      // let pos = navigator.geolocation.getCurrentPosition(
      //   // pos => {
      //   //   let geo = {
      //   //     lat: pos.coords.latitude,
      //   //     lng: pos.coords.longitude
      //   //   }
      //   //   this.addMarker(new google.maps.LatLng(geo.lat, geo.lng), "Your location");
      //   // }
      // );
    }
    // this.geoLoc.getCurrentPosition({enableHighAccuracy: true}).then(pos =>{

    //   let geo = {
    //     lat: pos.coords.latitude,
    //     lng: pos.coords.longitude
    //   }

    //   // alert(`lat:${geo.lat}, lng: ${geo.lng}`)
    //   this.addMarker(new google.maps.LatLng(geo.lat, geo.lng), "Your location");

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    //for event being passed
    let evInfo = this.navParams.get('eventInfo');
    if (evInfo) {

    }
  }

  addMarker(position: google.maps.LatLng, title: string) {
    return new google.maps.Marker({
      title: title,
      position: position,
      map: this.map
    });
  }

}