
$(document).ready( function(){

	// Event Listener passes data to the models.loader to fetch
	// categories from the EventBrite API. 
	$('#send_button').click( function() {
		// Collect information from category selectors. 
		console.log("Send button pressed."); 
		var options = [
			$('#category_select1 option:selected').val(), 
			$('#category_select2 option:selected').val(), 
			$('#category_select3 option:selected').val(), 
			];
		var loading_complete = false; 
		loadEvents(options, function(events){
			$('#events_title').show(200); 
			console.log("API Request complete!"); 
			console.log(events); 
			loading_complete = true
			displayEvents(events); 
		}); //End loadEvents
	}); //End sendButton
}); //End document.ready

function displayEvents(events){
	var event_name, event_time, event_location, fragment_to_append; 
	for (i=0; i<events.length; i++){
		event_name = events[i]["name"]["html"]; 
		event_location = events[i]["venue"]["address"]["address_1"]; 
		if(event_location==null){
			event_location = "Location unspecified"; 
		}
		fragment_to_append = "<div id=result_event" + i + ">" +
			"<h3>" + event_name + "</h3>" +
			"<b>" + event_location + "</b>" +
			"</div>"; 
		console.log("appending " + fragment_to_append); 
		$('#events').append(fragment_to_append); 
	}
}

