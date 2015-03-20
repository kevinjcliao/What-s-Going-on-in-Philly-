
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
		console.log(options); 
		loadEvents(options, function(events){
			console.log("Event complete!"); 
			console.log(events); 
			console.log("Operation terminated."); 
		}); //End loadEvents
	}); //End sendButton
}); //End document.ready


