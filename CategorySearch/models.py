# -*- coding: utf-8 -*-
import urllib2
import json
from pprint import pprint

# CONSTANTS: 
API_KEY = 'BKKRDKVUVRC5WG4HAVLT'

"""
CATEGORIES MODELLING: 
"""
# The Categories Object is a dictionary object containing category objects. 
# This dictionary object is stored in category_dict
class Categories:
    def __init__(self):
        # Loads data from Eventbrite API
        #response = urllib2.urlopen('https://www.eventbriteapi.com/v3/categories/?token=BKKRDKVUVRC5WG4HAVLT')
        response = urllib2.urlopen(self.createRequestURL())
        response_json = json.load(response)
        categories_json = response_json['categories']
        self.category_dict={}

        # Populate the category dictionary with each category_json by
        # calling the constructor for the category object. 
        for x in range(0, len(categories_json)):
            category_json = categories_json[x]

            self.category_dict[category_json['id']]=Category(category_json)

        print "Successfully created categories object. A total of " + str(x) + \
            " categories were imported."

    # Lists all the categories by their full name. 
    def __str__(self):
        strToReturn = ""
        for category_id, category in self.category_dict.iteritems():
            strToReturn += category_id + ": " + str(category)+"\n"

        return strToReturn

    # Returns the appropriate URL to request given the API Token. 
    def createRequestURL(self):
        urlToReturn = 'https://www.eventbriteapi.com/v3/categories/?token='
        return urlToReturn + API_KEY

    # Searches the category by ID and returns it. 
    def getCategory(self, category_id):
        return self.category_dict[str(category_id)]

    # Get Category dict: 
    def getCategoryDict(self):
        return self.category_dict

# Category Object: 
# Variable naming has been completely taken from the API. 
# category_id is the equivalent of id in the JSON Object. It was used
# because python reserves 'id' for its own uses. 
class Category:
    def __init__(self, category_json):
        self.resource_uri           = category_json['resource_uri']
        self.category_id            = category_json['id']
        self.name                   = category_json['name']
        self.name_localized         = category_json['name_localized']
        self.short_name             = category_json['short_name']
        self.short_name_localized   = category_json['short_name_localized']

    def __str__(self):
        return self.name

"""
EVENTS MODELLING
"""

# EventResults stores the result of a search as a dictionary by event_id
# against a BasicEvent. 
class EventResults:
    def __init__(self, category_id_list):
        # Formulate RequestURL from constructor variables. 
        urlToRequest = self.createRequestURL(category_id_list)
        print "Requesting: " + urlToRequest
        events_json = json.load(urllib2.urlopen(urlToRequest))
        events_json = events_json['events']
        self.events_dict = {}

        # Create objects by iterating through for loop like above: 
        for x in range(0, len(events_json)):
            event_json = events_json[x]
            self.events_dict[str(event_json['id'])] = Event(event_json)

        print "Successfully imported " + x + " events."

    # Lists all the events by their id and full name. 
    def __str__(self):
        strToReturn = ""
        for event_id, event in self.events_dict.iteritems():
            strToReturn += event_id + ": " + event.name + "\n"
        return strToReturn

    def createRequestURL(self, category_id_list):
        urlToReturn="https://www.eventbriteapi.com/v3/events/search/?categories="
        for x in range(0, len(category_id_list)):
            urlToReturn += str(category_id_list[x])
            if x<len(category_id_list)-1:
                urlToReturn+=","

        urlToReturn+="&token=BKKRDKVUVRC5WG4HAVLT"

        return urlToReturn

# Event is an object containing bare minimum event information required to
# display an event to a user. The advantage of this approach is that
# server-server communication is fast, but server-client communication is
# unpredictable. By handling the large API request server-side, and making the
# final data the user's browser needs to download much smaller, there will be
# performance benefits. 

class Event:
    def __init__(self, event_json):
        self.name = event_json['name']['html'].encode("utf-8-sig")
    def __str__(self):
        return self.name
