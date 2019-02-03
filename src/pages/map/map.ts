import { Component, ViewChild, ElementRef } from "@angular/core";
<<<<<<< HEAD
import { Platform, ToastController, NavParams } from "ionic-angular";
import { GeocodingProvider } from "../../providers/geocoding/geocoding";
import { GeocodeResponse } from "../../models/geocodeResponse";
=======
import { Platform, ToastController, NavParams, IonicPage } from "ionic-angular";
>>>>>>> taask/001-lazy-loaded-pages

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  search: string ="";
  map: google.maps.Map;
  mapCenter: google.maps.LatLng;
  locationArr: google.maps.Marker[] =[];
  resultsArr: google.maps.Marker[] =[];
  @ViewChild('map') mapRef: ElementRef;

  constructor(
    private plt: Platform, 
    private toast: ToastController, 
    private navParams: NavParams, 
    private geocoder: GeocodingProvider) { 
      this.locationArr = [];
      this.mapCenter = new google.maps.LatLng(18.006151, -76.747134);
    }

  ionViewDidLoad() {
    this.plt.ready().then(() => {
      this.loadMap();
      
    })
    console.log('ionViewDidLoad MapPage');
    
  }

  loadMap() {

    const ops: google.maps.MapOptions = {
      center: this.mapCenter,
      zoom: 15,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, ops);
    this.addMarker(new google.maps.LatLng(18.006151, -76.747134), "Research Days Tent", "yes");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => {
          this.map.panTo(new google.maps.LatLng(p.coords.latitude, p.coords.longitude));
          this.map.setZoom(15);

        }
      );


      navigator.geolocation.watchPosition(

        pos => {
          if(this.locationArr.length == 0) {
            this.locationArr = [];

          } else {
            this.locationArr[0].setMap(null);
            this.locationArr = [];
          
          }
          let yourLoc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          let marker = this.addMarkerWithoutPan(yourLoc, "your location","noAnimation");
          this.locationArr.push(marker);
        },
        err => {
          this.toast.create({
            message: "Your location is not currently available.",
            duration: 3500,
            position: "top"
          }).present();
        },
        {enableHighAccuracy: true,
        maximumAge: 3000}
      );

      this.getPassedEvent()
    }
  
  }

  findLocation(searchTerm) {
    this.clearResults();
    if (searchTerm !== null && searchTerm !== "" ) {
      this.geocoder.getLocation(searchTerm)
        .subscribe(
          (data: GeocodeResponse) => {
            if (data.status == "OK") {
              let coords = data.results[0].geometry.location;
              let marker = this.addMarker(new google.maps.LatLng(parseFloat(coords.lat),parseFloat(coords.lng)),"Your Destination", "yes");
              this.resultsArr.push(marker);

            } else {
              this.toast.create({
                message: "Could not find that location",
                duration: 3000
              }).present();
            }
          },
          error => {
            console.log(error);
          }
        );

    }
  }

  clearResults() {
    if(this.resultsArr.length == 0) {
      this.resultsArr = [];

    } else {

      this.resultsArr[0].setMap(null);
      this.resultsArr = [];
    
    }
  }

  getPassedEvent() {
    let evInfo = this.navParams.get('eventInfo');
    if (evInfo) {
      this.addMarker(new google.maps.LatLng(evInfo.lat, evInfo.lng),evInfo.title, "yes");
    }
  }
  addMarkerWithoutPan(position: google.maps.LatLng, title: string, canAnimate: string) {

    let marker = new google.maps.Marker({
      title: title,
      label: title,
      position: position,
      map: this.map
    });
    if(canAnimate === "yes") {
      marker.setAnimation(google.maps.Animation.DROP);
    }
    return marker;
  }

  addMarker(position: google.maps.LatLng, title: string, canAnimate?: string): google.maps.Marker {
    this.map.panTo(position);
    this.map.setZoom(16);
    return this.addMarkerWithoutPan(position,title,canAnimate);
  }

}