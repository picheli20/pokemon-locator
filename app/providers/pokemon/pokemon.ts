import { Injectable } from '@angular/core';
import {PokemonData} from './pokemon-interface';
import {LocationTracker} from '../location-tracker/location-tracker';
import {NavController, Alert} from 'ionic-angular';
import {PokemonNames} from './pokemon-names';


@Injectable()
export class Pokemon {
  data: PokemonData;
  location: LocationTracker;
  marker : any;
  nav;
  info;
  constructor(private pokeData: PokemonData, private loc : LocationTracker, nav: NavController) {
  	this.nav = nav;
    this.data = pokeData;
    this.location = loc;
    this.info = (new PokemonNames()).list[this.data.pokemonId];

	  let latLng = new google.maps.LatLng(this.data.latitude, this.data.longitude);

    this.marker = new google.maps.Marker({
          position: latLng,
          map: this.location.map,
          icon: 'https://ugc.pokevision.com/images/pokemon/' + this.data.pokemonId + '.png',
          title: 'Hello World!'
	  });

  	this.marker.addListener('click', () => {
  		let alert = Alert.create({
  			title: 'Pokemon Details',
  			subTitle: 'Name: ' + this.info.name + '\n' +
                  'Expires: ' + new Date(this.data.expiration_time) + '\n' +
                  'Distance of you: ' + this.location.measure(this.data.latitude, this.data.longitude) + ' m',
  			buttons: ['Ok!']
  		});
  		this.nav.present(alert);
  	});

  }

  removeIcon(){
  	this.marker.setMap(null);
  }
};