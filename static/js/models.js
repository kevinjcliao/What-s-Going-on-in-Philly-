// Document: models.js
// Copyright: Kevin Liao, 2015. 
// Description: A library that handles all large operations involving finding
// 							lists of events. 

var API_KEY = "BKKRDKVUVRC5WG4HAVLT"

function loadEvents(options, callback){
	console.log("Running Load Events for IDs: " + options[0] + ", " + options[1] + ", " + options[2]); 
	var urlToRequest = getURL(options); 
	console.log("Requesting from: " + urlToRequest); 
	var events = 0; 

	// Make API Request: 
	$.getJSON((urlToRequest), function (data){
		console.log('Callback being called.'); 
		console.log(data['events']); 
		events = data['events']; 
		callback(events); 
	});

}

// Returns the 
function getURL(options){
	var urlToReturn = "https://www.eventbriteapi.com/v3/events/search/?" + 
		// New Specifiers can be defined by: 
		// "&Specifier=" + WHAT_IS_BEING_SPECIFIED
		"venue.city="  + "Philadelphia" +
		"&categories=" + options[0] +
		"&token="      + API_KEY; 
	return urlToReturn; 
}
