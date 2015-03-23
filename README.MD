# What’s Going on in Philly? 
This Django web application presents the user with a search query for 3 categories of events and then searches for events that match the user’s interests in the Philadelphia area. 

## To run this (as it is not hosted yet): 
cd into the root directory of the project. 
` python manage.py runserver `
and then access the app on localhost:8000. Voila! 

## Understanding the code: 
### Categories: (Done in Django)
When the user requests a webpage from the Django application, the Django app makes an API request first to the Eventbrite server. No data is ever stored server-side as Eyal told me to store as little data as I could. These categories are passed into a Django template that is then served to the user. 

### Events: (Done in JS)
Upon submitting the search request, the client-side webapp calls the Eventbrite API. This is then presented to the user. Event handling is stored in static/js/models.js and static/js/views.js. 

## Note to recruiters: 
Here is an honest assessment of where I think I am after completing this assignment. I developed this application with the time that I had outside of class and schoolwork, and I definitely learned a lot. (Which was quite an enjoyable learning experience.) 

### My strengths: 
I was proud of what I was able to accomplish with front-end design. Although the design isn’t responsive, It does look great on full-screen web browsers. I felt that when I worked in Django, my code was very clearly organized, as I am well-trained in Object-Oriented design and writing clean code in OOP. 

### My weaknesses: 
There are many points of optimization primarily relating to asynchronous execution of loading and displaying that I have in my head, but don’t have the time to implement at the moment. I’m still not used to event-driven programming model and asynchronous callbacks that JavaScript uses. As such, I’d definitely like to work on cleaning up my JS and event-driven code in the future.

### Acknowledgments: (Thanks gaiz)
* [Glyphicons](http://marcoceppi.github.io/bootstrap-glyphicons/): The source of that beautiful search icon you see in that glorious navigation bar. 
* [Material Design Guidelines](http://www.google.com/design/spec/material-design/introduction.html): For giving me a good idea of what I wanted my app to look like. 
* [Bootstrap](http://getbootstrap.com/): Seldom used in my front-end, but still a pretty good framework nonetheless.
* [JQuery](https://jquery.com/): For making front-end JS so effortless. 