var MAP_API_KEY = 'AIzaSyBb8GOC34oXQFicfURjC5A09KAHBY8az2o'

$(document).ready( function(){
	// Event Listener passes data to the models.loader to fetch
	// categories from the EventBrite API. 

	$('#send_button').click( function() {
		// Collect information from category selectors. 
		console.log("Send button pressed."); 

		//Show loading. 
		$('#search_help_text').hide('slow'); 
		$('#search_query').hide('slow'); 
		$('#loading').show('slow'); 

		// Get information from boxes. 
		var options = [
			$('#category_select1 option:selected').val(), 
			$('#category_select2 option:selected').val(), 
			$('#category_select3 option:selected').val(), 
		];
		var loading_complete = false; 

		// Pass to models.js: 
		loadEvents(options, function(events, page_count, page_size){
			console.log("There are " + page_size + " events."); 
			var current_counter=0; 

			$('#events_title').show(200); 
			displayOnePage(current_counter, events); 
		}); //End loadEvents
	}); //End sendButton



	$('span.glyphicon-search').click( function() {
		$('#search_query').toggle('slow'); 
	}); 
}); //End document.ready

// Displays an entire 'page' of EventBrite API contents. Basically calls
// displayFiveEvents repetitively. 
function displayOnePage(current_counter, events, callback){
	displayNextFewEvents(current_counter, events, function() {
	
		$('#loading').hide('slow'); 
		console.log('displayEvents: Callback!'); 
		$('#follow_up_action').show('slow'); 
		current_counter += 5; 
	}); //End displayEvents
			
	$(window).scroll(function (){
		if ($(window).scrollTop() == $(document).height() - $(window).height()){
			displayNextFewEvents(current_counter, events, function(){
				console.log("Showing five more events."); 
				current_counter += 5; 
			}); 
		}
	}); 
}


// Displays next few events. Usually five unless there is less than
// five events left. In which case, it displays that amount. 
function displayNextFewEvents(initial_counter, events, callback){
	console.log('initial_counter: ' + initial_counter); 

	// Selects a rational maximum amount of events to load before more
	// scrolling is required. 
	var maximum_display_counter = initial_counter +5; 
	for (i=initial_counter; i<maximum_display_counter; i++){
		
		//Passes event to models.js function.  
		fragment_to_append = createNewHtmlFragment(events[i], MAP_API_KEY); 

		console.log("appending " + fragment_to_append); 
		$('#events').append(fragment_to_append); 
		$('#result_event'+i).show('slow'); 
	}

	// Give Google Maps requests time to load. 	
	setTimeout(function(){
		callback(); 
	}, 300); 
}

