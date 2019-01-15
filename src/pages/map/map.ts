import { Component } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMap, 
         GoogleMaps, 
         GoogleMapsEvent,
        //  GoogleMapControlOptions, 
        //  CameraPosition,
         Marker,
        //  MarkerOptions, 
         GoogleMapOptions, 
         Environment} from "@ionic-native/google-maps";

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {

  map: GoogleMap;

  constructor(private geoLoc: Geolocation, private plt: Platform, private toast: ToastController) {}
  
  ionViewDidLoad() {
    this.plt.ready().then(_ => {
      this.prepareBrowser();
      this.loadMap();
      
    })
    console.log('ionViewDidLoad MapPage');
    
    
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 18.006168,
          lng: -76.746955
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => console.log('Map is ready!'));

    this.geoLoc.getCurrentPosition({enableHighAccuracy: true}).then(pos =>{

      // let marker: Marker = this.map.addMarkerSync({
      //   title: 'Ionic',
      //   icon: 'blue',
      //   animation: 'DROP',
      //   position: {
      //     lat: pos.coords.latitude,
      //     lng: pos.coords.longitude
      //   }
      // });

      // marker.on(GoogleMapsEvent.MARKER_CLICK)
      //   .subscribe(() => {
      //     alert('clicked');
      //   }
      // );
      this.map.addMarker({
        title: 'You',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      }).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            this.showToast('clicked');
          })
      })


    }).catch((error) => {
      console.log('Error getting location', error);
    });
    //for event being passed
        let eventMarker: Marker = this.map.addMarkerSync({
          title: 'Event',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: 18.006168,
            lng: -76.746955
          }
        });
  
        eventMarker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {alert('ecent clicked')});


  }


  showToast(coords: {}) {
    this.toast.create( {
      message: `your coords: ${coords}`,
      duration: 2000
    }).present();
  }

  prepareBrowser() {
    if (document.URL.startsWith('http')) {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDKcmfgCAUE5RBxqOI8Ucsz9SHqjDjCVVA',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDKcmfgCAUE5RBxqOI8Ucsz9SHqjDjCVVA'
      })
    }
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


