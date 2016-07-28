import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Pokemon} from './pokemon';
import {LocationTracker} from '../location-tracker/location-tracker';
import {NavController, Alert} from 'ionic-angular';

interface geoPosition {
  latitude : number,
  longitude : number
}
@Injectable()
export class PokemonManager {
  PokemonList: any;
  location: LocationTracker;
  nav;

  constructor(private http: Http) {
    this.PokemonList = [];
  }

  setNavController(nav : NavController){
    this.nav = nav;
  }

  refreshList(lat, log){
    this.http.get('https://pokevision.com/map/data/' + lat + '/' + log)
     .map(res => res.json())
     .subscribe(data => {
         // Removing all Pokemons from map to refresh
        for (var i = 0; i < this.PokemonList; ++i) {
          var pokemon = this.PokemonList[i];
          pokemon.removeIcon();
        }

        // Empty the list to avoid menory stack
        this.PokemonList = [];

        for (var i = 0; i < data.pokemon.length; ++i) {
          this.PokemonList.push(new Pokemon(data.pokemon[i], this.location, this.nav));
        }
      }, (error) =>{
        let alert = Alert.create({
          title: 'Request Pokerror',
          subTitle: 'Error: ' + error,
          buttons: ['Ok!']
        });
        this.nav.present(alert);
      });
  }

  load(loc : LocationTracker) {
    this.location = loc;
    this.location.getLocation().then((pos : geoPosition) => {
      this.refreshList(pos.latitude, pos.longitude);
    });
  }
}

