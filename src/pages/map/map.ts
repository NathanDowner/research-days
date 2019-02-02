import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform, ToastController, NavParams } from "ionic-angular";

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  search: string ="";
  map: google.maps.Map;
  mapCenter: google.maps.LatLng;
  locationArr: google.maps.Marker[];
  @ViewChild('map') mapRef: ElementRef;

  constructor(
    private plt: Platform, 
    private toast: ToastController, 
    private navParams: NavParams) { 
      this.locationArr = [];
      this.mapCenter = new google.maps.LatLng(18.006168, -76.746955);
    }

  ionViewDidLoad() {
    this.plt.ready().then(() => {
      this.loadMap();
      
    })
    console.log('ionViewDidLoad MapPage');
    
  }

  loadMap() {

    const options = {
      center: this.mapCenter,
      zoom: 15,
      fullScreenControl: false
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => {
          this.map.panTo(new google.maps.LatLng(p.coords.latitude, p.coords.longitude));
          this.map.setZoom(12);

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
          let marker = this.addMarker(yourLoc, "your location","noAnimation");
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

  getPassedEvent() {
    let evInfo = this.navParams.get('eventInfo');
    if (evInfo) {
      this.addMarker(new google.maps.LatLng(evInfo.lat, evInfo.lng),evInfo.title, "yes");
    }
  }

  addMarker(position: google.maps.LatLng, title: string, canAnimate?: string) {
    this.map.panTo(position);
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

}