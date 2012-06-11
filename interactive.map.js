// interactive-map google maps v3 api jquery plugin
// version 1.0.0a
// (c) 2012 emre kılınç [emre@famepub.com]
// releated under the MIT license
;
var InteractiveMap = (function( $, window, document, undefined ){
	"use strict";
	
	var InteractiveMap = function( options ){	
		
		var defaults = {
			element: 'body',
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			lat: -34.397,
			lng: 150.644,
			disableDefaultUI: false
		};
		
		var mapOptions = $.extend( {}, defaults, options );
		// The exact point the mapp will be centered by default
		mapOptions.center = new google.maps.LatLng( mapOptions.lat, mapOptions.lng );
		
		// Main variables
		this.map = null;
		this.markers = null;
		
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
						callback( arg );
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

