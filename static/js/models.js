// Document: models.js
// Copyright: Kevin Liao, 2015. 
// Description: A library that handles all large operations involving finding
// 							lists of events. 

var API_KEY = "BKKRDKVUVRC5WG4HAVLT"

function loadEvents(options){
	console.log("Running Load Events for IDs: " + options[0] + ", " + options[1] + ", " + options[2]); 
	var urlToRequest = getURL(options); 
	console.log("Requesting from: " + urlToRequest); 
	var events = 0; 
	$.getJSON((urlToRequest), function (data){
		console.log(data['events']); 
		events = data['events']; 
		if(events!=0){
			return events; 
		}
		else{
			console.log("Err: Events request failed."); 
			return 0;
		}
	});

}

function getURL(options){
	var urlToReturn = "https://www.eventbriteapi.com/v3/events/search/?" + 
		"venue.city="  + "Philadelphia" +
		"&categories=" + options[0] +
		"&token="      + API_KEY; 
	return urlToReturn; 
}
