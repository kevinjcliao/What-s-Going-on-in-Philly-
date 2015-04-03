// Document: models.js
// Copyright: Kevin Liao, 2015. 
// Description: A library that handles all large operations involving finding
// 							lists of events. 

var API_KEY = ""; /*INSERT YOUR API_KEY HERE*/

// loadEvents sends a AJAX Request to the server. 
// In order to call the data from load events, 
// place a callback that handles the events variable. 
// e.g. loadEvents(options, function(events){}); 
function loadEvents(options, page_number, callback){
	console.log("Running Load Events for IDs: " + options[0] + ", " + options[1] + ", " + options[2]); 
	var urlToRequest = getURL(options, 1); 
	console.log("Requesting from: " + urlToRequest); 

	// Make first API Request: 
	$.getJSON((urlToRequest), function (data){

		var page_count = data["pagination"]["page_count"]; 
		var page_size  = data["pagination"]["page_size"]; 
		var events 		 = data['events']; 

		console.log("There are " + page_count + "pages"); 
		
		//Massive JSON request from all pages and combine them into the array.
		/*for(i=2; i<=page_count; i++){
			urlToRequest = getURL(options, i); 
			console.log("Requesting from: " + urlToRequest); 
			var events_to_add=[]; 
			$.getJSON((urlToRequest), function(newData){
				events_to_add = events_to_add.concat(newData['events']); 
				console.log(events_to_add); 
			}); 	
		} 		*/
		
		loadMorePagesOfEvents(options, page_count, function(events_to_add){
			events = events.concat(events_to_add); 
			callback(events, page_count, events.length); 
			console.log(events); 	
			console.log("API Request complete!"); 
		}); 	


	}); //End API Request

}

function loadMorePagesOfEvents(options, page_count, callback){
	//Massive JSON request from all pages and combine them into the array.
	for(i=2; i<=page_count; i++){
		urlToRequest = getURL(options, i); 
		console.log("Requesting from: " + urlToRequest); 
		var events_to_add=[]; 
		$.getJSON((urlToRequest), function(newData){
			events_to_add = events_to_add.concat(newData['events']); 
			console.log(events_to_add); 
			if(i=page_count) {
				callback(events_to_add); 
			}
		}); 	
	} 		
}

// Returns the appropriate URL: 
function getURL(options, page_number){
	var urlToReturn = "https://www.eventbriteapi.com/v3/events/search/?" + 
		// New Specifiers can be defined by: 
		// "&Specifier=" + WHAT_IS_BEING_SPECIFIED
		"venue.city="  + "Philadelphia" +
		"&categories=" + options[0] + "," +
			options[1] + "," + 
			options[2] +
		"&page="       + page_number +
		"&token="      + API_KEY; 
	return urlToReturn; 
}

function createNewHtmlFragment(event_to_display, MAP_API_KEY){

	var event_name 		 	 	= event_to_display["name"]["html"]; 
	var event_location	 	= event_to_display["venue"]["address"]["address_1"]; 
	var event_url 			 	= event_to_display["url"]; 

	var event_time  			= (new Date(event_to_display["start"]["local"])).toString(); 
	
	// JavaScript really likes to throw an error when event_description is a null,
	// so I've put it inside this try_catch. 
	try{ 
		var event_description = event_to_display["description"]["text"]; 
	} catch(err){
		var event_description = "No description provided. "; 
	}

	// Cut event_description: 
	if (event_description.length>400){
		event_description = event_description.substring(0, 400); 
		event_description = event_description+"..."; 
	}
	
	// Handle null locations.	
	if(event_location == null) {
		event_location = "Location unspecified."; 
	}



	var html_fragment =  "<div id='result_event" + i + "'" + 
			"class=result_event style='display: none'>" + 
			"<div id='event_left'>" +
			"<h3><a href='" + event_url + "'>" + event_name + "</a></h3>" +
			"<b>" + event_time + "</b>" + "</br>" + "</br>" +
			"<b>Description</b>" + 
			"<p>" + event_description + "</p>" + 
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
