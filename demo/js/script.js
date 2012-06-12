(function($){
	
	myMap = new InteractiveMap({ element: '.map', disableDefaultUI: true, lat: 59.32522, lng: 18.07002, zoom: 8, mapType: 'terrain' });	
	var marker = myMap.addMarker({ 
		lat: 59.32522, 
		lng: 18.07002, 
		title: 'AQ',
		click: function( evt ){
			console.log( 'tıklandı', evt, this ); // this refers to the function
		},
		content: '<strong>This is some content</strong>'
	});

	
		// 
		// myMap.on('click', function( lat, lng ){
		// 	
		// 	var marker = myMap.addMarker({ 
		// 		lat: lat, 
		// 		lng: lng, 
		// 		title: 'AQ',
		// 		click: function( evt ){
		// 			console.log( 'tıklandı', evt, this ); // this refers to the function
		// 		},
		// 		content: '<strong>This is some content</strong>'
		// 	});
		// 	console.log( marker );
		// 			
		// });
		// 
		// myMap.addPolyline([{lat:37.772323, lng:-122.214897}, {lat:21.291982, lng:-157.821856}, {lat:-18.142599, lng:178.431}, {lat:-27.46758, lng:153.027892}], { color: '#000', thickness: '2' });
		// 
		// 
		// myMap.addPolyline([{lat:40, lng:40}, {lat:30, lng:30}, {lat:-18.142599, lng:178.431}], { thickness: '2' });
		// 

})(jQuery);

