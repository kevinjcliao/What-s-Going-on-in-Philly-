// Document: models.js
// Copyright: Kevin Liao, 2015. 
// Description: A library that handles all large operations involving finding
// 							lists of events. 

var API_KEY = "BKKRDKVUVRC5WG4HAVLT"

// loadEvents sends a AJAX Request to the server. 
// In order to call the data from load events, 
// place a callback that handles the events variable. 
// e.g. loadEvents(options, function(events){}); 
function loadEvents(options, callback){
	console.log("Running Load Events for IDs: " + options[0] + ", " + options[1] + ", " + options[2]); 
	var urlToRequest = getURL(options); 
	console.log("Requesting from: " + urlToRequest); 

	// Make API Request: 
	$.getJSON((urlToRequest), function (data){
		console.log(data['events']); 

		var page_count = data["pagination"]["page_count"]; 
		var page_size  = data["pagination"]["page_size"]; 
		var events 		 = data['events']; 
		
		callback(events, page_count, page_size); 
		console.log("API Request complete!"); 
	}); //End API Request

}

// Returns the appropriate URL: 
function getURL(options){
	var urlToReturn = "https://www.eventbriteapi.com/v3/events/search/?" + 
		// New Specifiers can be defined by: 
		// "&Specifier=" + WHAT_IS_BEING_SPECIFIED
		"venue.city="  + "Philadelphia" +
		"&categories=" + options[0] + "," +
			options[1] + "," + 
			options[2] +
		"&token="      + API_KEY; 
	return urlToReturn; 
}

function createNewHtmlFragment(event_to_display, MAP_API_KEY){
	var event_name, event_time, event_location, fragment_to_append; 
	event_name 		 	 	= event_to_display["name"]["html"]; 
	event_location	 	= event_to_display["venue"]["address"]["address_1"]; 
	event_url 			 	= event_to_display["url"]; 
	event_time  			= null; 
	
	if(event_location == null) {
		event_location = "Location unspecified."; 
	}

	var html_fragment =  "<div id='result_event" + i + "'" + 
			"class=result_event style='display: none'>" + 
			"<div id='event_left'>" +
			"<h3><a href='" + event_url + "'>" + event_name + "</a></h3>" +
			"</div>" +
			"<div id='event_right'>" +
			// Google Maps API Request
			"<iframe id='map' width='300' height='300' frameborder='0' style='border:0' "+ 
			"src='https://www.google.com/maps/embed/v1/place?key=" + MAP_API_KEY +
			"&q=" + event_location + ", Philadelphia'>" + 
			"</iframe>" + "<br>" +
			"<p class='result_location_name'>" + event_location + "</p>"  +
			"</div>" +
			"</div>"; 

	return html_fragment; 
}
