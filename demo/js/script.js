(function($){
	
	myMap = new InteractiveMap({ element: '.map', disableDefaultUI: true, lat: 24.886436490787712, lng: -70.2685546875, zoom: 5, mapType: 'terrain' });	
	
	// myMap.renderDirections({
	// 	origin: {
	// 		lat: 36.18861,
	// 		lng: 33.6633339
	// 	},
	// 	destination: {
	// 		lat: 36.83484,
	// 		lng: 34.6474075
	// 	},
	// 	markers: false,
	// 	travelMode: 'driving'
	// });
	// 
	// 
	// myMap.renderDirections({
	// 	origin: {
	// 		lat: 36.65512,
	// 		lng: 33.3644371
	// 	},
	// 	destination: {
	// 		lat: 36.7025,
	// 		lng: 34.3683319
	// 	},
	// 	markers: false,
	// 	travelMode: 'walking'
	// });
	
	myMap.renderDirections({
		origin: {
			lat: 36.65244,
			lng: 34.38062
		},
		destination: {
			lat: 36.6658325,
			lng: 34.3997231
		},
		markers: false,
		travelMode: 'driving',
		// instructions: function( data ){
		// 			console.log(data);
		// 		}
		resultsElement: '#panel1'
	});
	
	
	
	//myMap.addPolygon([{lat:25.774252, lng:-80.190262}, {lat:18.466465, lng:-66.118292}, {lat:32.321384, lng:-64.75737}, {lat:25.774252, lng:-80.190262}], { color: '#000' });
	
	
	
	// var marker = myMap.addMarker({ 
	// 		lat: 59.32522, 
	// 		lng: 18.07002, 
	// 		title: 'AQ',
	// 		click: function( evt ){
	// 			console.log( 'tıklandı', evt, this ); // this refers to the function
	// 		},
	// 		content: '<strong>This is some content</strong>'
	// 	});

	
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

