(function($){
	
	myMap = new InteractiveMap({ element: '.map', disableDefaultUI: true, lat: 0, lng: -180, zoom: 2, mapType: 'terrain' });	
	
	myMap.on('click', function( lat, lng ){
		
		myMap.addMarker({ lat: lat, lng: lng, title: 'AQ' });
			
	});
	
	myMap.addPolyline([{lat:37.772323, lng:-122.214897}, {lat:21.291982, lng:-157.821856}, {lat:-18.142599, lng:178.431}, {lat:-27.46758, lng:153.027892}], { color: '#000', thickness: '2' });
	
	
	myMap.addPolyline([{lat:40, lng:40}, {lat:30, lng:30}, {lat:-18.142599, lng:178.431}], { thickness: '2' });
	

})(jQuery);

