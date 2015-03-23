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
	var events = 0; 

	// Make API Request: 
	$.getJSON((urlToRequest), function (data){
		console.log(data['events']); 
		events = data['events']; 
		callback(events); 
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

function createNewHtmlFragment(event_number, event_url, event_name, MAP_API_KEY, event_location){
	var HtmlFragment =  "<div id='result_event" + i + "'" + 
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

	return HtmlFragment; 
}
