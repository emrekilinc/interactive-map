// interactive-map google maps v3 api jquery plugin
// version 1.0.0a
// (c) 2012 emre kılınç [emre@famepub.com]
// releated under the MIT license
;
var InteractiveMap = (function( $, window, document, undefined ){
	//"use strict";
	
	var InteractiveMap = function( options ){	
		
		var defaults = {
			element: 'body',
			zoom: 8,
			mapType: 'roadmap',
			lat: -34.397,
			lng: 150.644,
			disableDefaultUI: false
		};
		
		var mapOptions = $.extend( {}, defaults, options );
		// The exact point the mapp will be centered by default
		mapOptions.center = new google.maps.LatLng( mapOptions.lat, mapOptions.lng );
		
		// Setting the map type
		if( options.mapType === 'roadmap' || options.mapType == undefined ){
			mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
		}
		
		options.mapType === 'satellite' && (mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE);
		options.mapType === 'hybrid' && (mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID);
		options.mapType === 'terrain' && (mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN);
		
		// Main variables
		this.map = null;
		this.markers = [];
		this.polylines = [];
		this.polygons = [];
		this.directionService = null;
		
		// Instantiate the map
		this.map = new google.maps.Map( $( mapOptions.element )[0], mapOptions );
	}
	
	// Reposition the center 
	InteractiveMap.prototype.setCenter = function( lat, lng ){
		var self = this;
		self.map.setCenter(new google.maps.LatLng( lat, lng ));
	}
	
	// Change google map type
	InteractiveMap.prototype.changeMapType = function( mapType ){
		var self = this;
		// Refactor here
		if( mapType === 'roadmap' || mapType == undefined ){
			self.map.setMapTypeId( google.maps.MapTypeId.ROADMAP );
		}
		else if( mapType === 'satellite' ){
			self.map.setMapTypeId( google.maps.MapTypeId.SATELLITE );
		}
		else if( mapType === 'hybrid' ){
			self.map.setMapTypeId( google.maps.MapTypeId.HYBRID );
		}
		
		else if( mapType === 'terrain' ){
			self.map.setMapTypeId( google.maps.MapTypeId.TERRAIN );
		}
			
	}
	
	InteractiveMap.prototype.changeMapControls = function( options ){
		var self = this;
		
		// Disadvantage all controls is being resetted
		var defaults = {
		  panControl: true,
		  zoomControl: true,
		  mapTypeControl: true,
		  scaleControl: true,
		  streetViewControl: true,
		  overviewMapControl: true
		};
		
		var controlOptions = $.extend( {}, defaults, options );
		self.map.setOptions( controlOptions );
	}
	
	// Increase zoom
	InteractiveMap.prototype.zoomIn = function(){
		var self = this,
		currentZoom = self.map.getZoom();
		
		self.map.setZoom(++currentZoom);
	}
	
	// Decrease zoom
	InteractiveMap.prototype.zoomOut = function(){
		var self = this,
		currentZoom = self.map.getZoom();
		
		self.map.setZoom(--currentZoom);
	}
	
	// Set zoom manually
	InteractiveMap.prototype.setZoom = function( value ){
		var self = this;
		this.map.setZoom( value );
	}
	
	// Get Zoom Value
	InteractiveMap.prototype.getZoom = function(){
		var self = this;
		return this.map.getZoom();
	}
	
	// Add Marker
	InteractiveMap.prototype.addMarker = function( options ){
		var self = this;
		
		var defaults = {
			lat: this.map.getCenter().lat(),
			lng: this.map.getCenter().lng(),
			title: 'My marker',
			icon: undefined,
			draggable: false,
			animation: google.maps.Animation.DROP // By default animation is DROP -- BOUNCE or null are other options
		};
		
		var markerOptions = $.extend( {}, defaults, options );
		markerOptions.position = new google.maps.LatLng( markerOptions.lat, markerOptions.lng );
		
		var marker = new google.maps.Marker( markerOptions );
		marker.setMap( self.map );
		this.markers.push(marker);
		
		// Setting info window
		if( options.content ){
			
			var infoWindow = new google.maps.InfoWindow({ content: options.content });
			
			if( options.infoWindowTrigger ){
				
				google.maps.event.addListener( marker, options.infoWindowTrigger, function(){
					infoWindow.open( self.map, marker );
				});
				
			}else{
				// Open by default
				infoWindow.open( self.map, marker );
				google.maps.event.addListener( marker, 'click', function(){
					infoWindow.open( self.map, marker );
				});
				
			}
			
		}
		
		var events = [ 'click', 'dblclick', 'rightclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseup', 'mouseout', 'mouseover' ];
		
		for (var e=0; e < events.length; e++) {
			if( typeof( options[events[e]] ) === 'function' ){
				var eventName = events[e];
				google.maps.event.addListener( marker, events[e], function( evt ){
					options[eventName].call( options[eventName], evt );
				});
			}
		};
	}
	
	// Remove All Markers -- Still in the array
	InteractiveMap.prototype.removeMarkers = function(){
		var self = this;
		
		if( self.markers ){
			for ( var i=0; i < self.markers.length; i++ ) {
				self.markers[i].setMap( null );
			};
		}
	}
	
	// Show markers that is still in the array
	InteractiveMap.prototype.showMarkers = function(){
		var self = this;
		
		if( self.markers ){
			for ( var i=0; i < self.markers.length; i++ ) {
				self.markers[i].setMap( self.map );
			};
		}
		
	}
	
	// Delete all markers including the array
	InteractiveMap.prototype.deleteMarkers = function(){
		var self = this;
		
		if( self.markers ){
			for ( var i=0; i < self.markers.length; i++ ) {
				self.markers[i].setMap( null );
			};
		}
		self.markers.length = 0;
	}
	
	// Add Polyline - aka Plan
	InteractiveMap.prototype.addPolyline = function( coordinatesArray, options ){
		
		var self = this,
			polyLineOptions = {
				path: [],
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			};
		
		options.color && ( polyLineOptions.strokeColor = options.color );
		options.opacity && ( polyLineOptions.strokeOpacity = options.opacity );
		options.thickness && ( polyLineOptions.strokeWeight = options.thickness );
		
		if( coordinatesArray ){
			
			for (var i=0; i < coordinatesArray.length; i++) {
				polyLineOptions.path.push( new google.maps.LatLng( coordinatesArray[i].lat, coordinatesArray[i].lng ) );
			};
			
			var polyline = new google.maps.Polyline( polyLineOptions );
			polyline.setMap( self.map );
			
			self.polylines.push( polyline );
		}
		
	}
	
	// Remove polylines -- Still in the array
	InteractiveMap.prototype.removePolylines = function(){
		var self = this;
		
		if( self.polylines ){
			for ( var i=0; i < self.polylines.length; i++ ) {
				self.polylines[i].setMap( null );
			};
		}
	}
	
	// Show polylines -- Still in the array
	InteractiveMap.prototype.showPolylines = function(){
		var self = this;
		
		if( self.polylines ){
			for ( var i=0; i < self.polylines.length; i++ ) {
				self.polylines[i].setMap( self.map );
			};
		}
	}
	
	// Delete polylines - including the ones in the array
	InteractiveMap.prototype.deletePolylines = function(){
		var self = this;
		
		if( self.polylines ){
			for ( var i=0; i < self.polylines.length; i++ ) {
				self.polylines[i].setMap( null );
			};
			
			self.polylines.length = 0;
		}
	}
	
	InteractiveMap.prototype.addPolygon = function( coordinatesArray, options ){
		var self = this,
			polygonOptions = {
				paths: [],
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			};
		
		options.color && ( polygonOptions.strokeColor = options.color );
		options.opacity && ( polygonOptions.strokeOpacity = options.opacity );
		options.thickness && ( polygonOptions.strokeWeight = options.thickness );
		options.background && ( polygonOptions.fillColor = options.background );
		options.backgroundOpacity && ( polygonOptions.fillOpacity = options.backgroundOpacity );
				
		if( coordinatesArray ){
			
			for (var i=0; i < coordinatesArray.length; i++) {
				polygonOptions.paths.push( new google.maps.LatLng( coordinatesArray[i].lat, coordinatesArray[i].lng ) );
			};
			
			var polygon = new google.maps.Polygon( polygonOptions );
			polygon.setMap( self.map );
			
			self.polygons.push( polygon );
		}
		
	}
	
	// Remove polygons -- Still in the array
	InteractiveMap.prototype.removePolygons = function(){
		var self = this;
		
		if( self.polygons ){
			for ( var i=0; i < self.polygons.length; i++ ) {
				self.polygons[i].setMap( null );
			};
		}
	}
	
	// Show polygons -- Still in the array
	InteractiveMap.prototype.showPolygons = function(){
		var self = this;
		
		if( self.polygons ){
			for (var i=0; i < self.polygons.length; i++) {
				self.polygons[i].setMap( self.map );
			};
		}
	}
	
	// Delete polygons - including the ones in the array
	InteractiveMap.prototype.deletePolygons = function(){
		var self = this;
		
		if( self.polygons ){
			for ( var i=0; i < self.polygons.length; i++ ) {
				self.polygons[i].setMap( null );
			};
			
			self.polygons.length = 0;
		}
	}
	
	// 1. Directions
	// 2. Distances between places
	// 3. Geocoding
	
	InteractiveMap.prototype.renderDirections = function( options ){
		var self = this,
			directionsOptions = {
				origin: null,
				destination: null,
				travelMode: google.maps.TravelMode.DRIVING
			};
			
		self.directionService = new google.maps.DirectionsService();
					
		options.origin && ( directionsOptions.origin = new google.maps.LatLng( options.origin.lat, options.origin.lng ) );
		options.destination && ( directionsOptions.destination = new google.maps.LatLng( options.destination.lat, options.destination.lng ) );
		
		if( options.travelMode === 'driving' || options.travelMode === undefined ){
			directionsOptions.travelMode = google.maps.TravelMode.DRIVING;
		}
		else if( options.travelMode === 'walking' ){
			directionsOptions.travelMode = google.maps.TravelMode.WALKING;
		}
		else if( options.travelMode === 'bicycle' ){
			directionsOptions.travelMode = google.maps.TravelMode.BICYCLING;
		}
		
		self.directionService.route( directionsOptions, function( response, status ){
			
			console.log( response, status );
			
			var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.suppressMarkers = !options.markers;
			directionsDisplay.setMap( self.map );
			
			if( options.resultsElement ){
				directionsDisplay.setPanel( $(options.resultsElement)[0] );
			}
			
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections( response );
			}
		});
		
	}
	
	// Events
	InteractiveMap.prototype.on = function( event, callback ){
		var self = this;
		
		if( typeof( event ) === 'string' )
		{
			// DOM Event
			if( event === 'click' || event === 'dblclick' || 
				event === 'mouseup' || event === 'mousedown' || 
				event === 'mouseover' || event === 'mouseout' ){
					
					google.maps.event.addListener( self.map, event, function( arg ){
						callback( arg.latLng.lat(), arg.latLng.lng() );
					} );
					
			}
			else if( event === 'bounds_changed' || event === 'center_changed' || 
				event === 'drag' || event === 'dragend' || 
				event === 'dragstart' || event === 'heading_changed' || 
				event === 'idle' || event === 'maptypeid_changed' || 
				event === 'projection_changed' || event === 'tilesloaded' || 
				event === 'tilt_changed' || event === 'zoom_changed' ){
				
					google.maps.event.addListener( self.map, event, function( arg ){
						callback( arg );
					} );
				
			}
			else if( event === 'resize' ){
				
				// Doubtful
				
				google.maps.event.addListener( self.map, event, function( arg ){
					callback( arg );
				} );
				
				google.maps.event.trigger( self.map, 'resize' );
				
			}
		}
	}
	
	
	return InteractiveMap;
}( jQuery, window, document ));

