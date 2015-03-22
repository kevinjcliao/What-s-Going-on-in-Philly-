var MAP_API_KEY = 'AIzaSyBb8GOC34oXQFicfURjC5A09KAHBY8az2o'

$(document).ready( function(){
	// Event Listener passes data to the models.loader to fetch
	// categories from the EventBrite API. 

	$('#send_button').click( function() {
		// Collect information from category selectors. 
		console.log("Send button pressed."); 
		$('#search_help_text').hide('slow'); 
		$('#search_query').hide('slow'); 
		$('#loading').show('slow'); 

		var options = [
			$('#category_select1 option:selected').val(), 
			$('#category_select2 option:selected').val(), 
			$('#category_select3 option:selected').val(), 
		];
		var loading_complete = false; 

		loadEvents(options, function(events){
			var current_counter=0; 

			$('#events_title').show(200); 
			console.log("API Request complete!"); 
			console.log(events); 
			loading_complete = true
	
			displayEvents(current_counter, events, function() {
	
				$('#loading').hide('slow'); 
				console.log('displayEvents: Callback!'); 
				$('#follow_up_action').show('slow'); 
				current_counter += 6; 
			}); //End displayEvents
			
			$(window).scroll(function (){
				if  ($(window).scrollTop() == $(document).height() - $(window).height()){
					console.log(events); 
					displayEvents(current_counter, events, function(){
						console.log("Showing five more events."); 
						current_counter += 6; 
					}); 
				}
			}); 
		}); //End loadEvents
	}); //End sendButton



	$('span.glyphicon-search').click( function() {
		$('#search_query').toggle('slow'); 
	}); 
}); //End document.ready

function displayEvents(initial_counter, events, callback){
	console.log('initial_counter: ' + initial_counter); 

	// Collects information from the events list
	var event_name, event_time, event_location, fragment_to_append; 

	// Selects a rational maximum amount of events to load before more
	// scrolling is required. 
	var maximum_display_counter = initial_counter+5; 

	for (i=initial_counter; i<=maximum_display_counter; i++){
		// Variable creation: 
		event_name = events[i]["name"]["html"]; 
		event_location = events[i]["venue"]["address"]["address_1"]; 
		event_url = events[i]["url"]; 
		event_time = null; 


		if(event_location==null){
			event_location = "Location unspecified"; 
		}

		fragment_to_append = "<div id='result_event" + i + "'" + 
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
		console.log("appending " + fragment_to_append); 
		$('#events').append(fragment_to_append); 
		$('#result_event'+i).show('slow'); 
	}

	// Give Google Maps requests time to load. 	
	setTimeout(function(){
		callback(); 
	}, 300); 
}

