import {Component, OnInit} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker/location-tracker';
//import {BackgroundMode} from 'ionic-native';
import {PokemonManager} from '../../providers/pokemon/pokemon-manager';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [LocationTracker, PokemonManager]

})

export class HomePage implements OnInit{
	map = null;
	location : LocationTracker;
	manager : PokemonManager;
	list : any;
	intervalID : number;
	distance = 40;

	constructor(private navCtrl: NavController, 
				private loc : LocationTracker,
				private PokemonMana : PokemonManager) {
		this.location = loc;
		this.manager = PokemonMana;
		this.list = [];

		this.manager.setNavController(navCtrl);
	}

	ngOnInit() {
		/*
		// Android customization
	    BackgroundMode.setDefaults({ 
	    	title:'Pokemon Locator',
	    	silent : true,
	    	resume : true
	    });

	    // Enable background mode
	    BackgroundMode.enable();

	    BackgroundMode.on('active', () => {
            BackgroundMode.update({
                text:'Running in background',
                silent : false
            });
	        setInterval(() => {
	            this.manager.load(this.location);
	        }, 5000);
	        setInterval(() => {
            	let pokemonSuround = 0;
	            for (var i = 0; i < this.manager.PokemonList.length; ++i) {
	            	var pokemon = this.manager.PokemonList[i];
	            	if(this.location.measure(pokemon.data.latitude, pokemon.data.longitude) > this.distance){
	            		pokemonSuround ++;
	            	}
	            }

	            if(pokemonSuround > 0){
					BackgroundMode.update({
						text:'There is ' + pokemonSuround + ' nearby',
						silent : false
					});

	            }
	        }, 1000);

	    });
	    */
	    
		this.location.setupMap('map');

		this.intervalID = setInterval(() => {
			this.manager.load(this.location);
		}, 5000);
	}
}
