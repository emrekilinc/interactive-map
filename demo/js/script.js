(function($){
	
	myMap = new InteractiveMap({ element: '.map', disableDefaultUI: true });	
	
	myMap.on('click', function( lat, lng ){
		
		myMap.addMarker({ lat: lat, lng: lng, title: 'AQ' });
			
	});
	

})(jQuery);

