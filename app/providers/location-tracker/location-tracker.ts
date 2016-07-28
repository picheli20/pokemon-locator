import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';
 
@Injectable()
export class LocationTracker {
  private watchID = null;
  private delay = 5000;
  map;
  latitude = 0;
  longitude = 0;
  marker = null;

  measure(lat, lon){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (this.longitude - lat) * Math.PI / 180;
    var dLon = (this.longitude - lon) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.longitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
  }

  getLocation() {
    return new Promise(resolve => {
      let options = {timeout: 10000, enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        let pos = { latitude : this.latitude, longitude : this.longitude};

        let latLng = new google.maps.LatLng(this.latitude, this.longitude);

        if(this.marker !== null){
          this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'You!'
        });

        resolve(pos);
      },(error) => {
          console.log(error);
          setTimeout(this.getLocation, 1000);
      }, options);
    });
  }

  loadMap(){
    let latLng = new google.maps.LatLng(45.077917, 7.694971100000001);

    let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }

  setupMap(mapID : string){
    this.loadMap();
  }

  stopWatch(){
    return clearInterval(this.watchID);
  }
}