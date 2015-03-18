import urllib2
import json
from pprint import pprint

# The Categories Object is a dictionary object containing category objects. 
# This dictionary object is stored in category_dict
class Categories:
    def __init__(self):
        # Loads data from Eventbrite API
        response = urllib2.urlopen('https://www.eventbriteapi.com/v3/categories/?token=BKKRDKVUVRC5WG4HAVLT')
        response_json = json.load(response)
        categories_json = response_json['categories']
        self.category_dict={}

        # Populate the category dictionary with each category_json by
        # calling the constructor for the category object. 
        for x in range(0, len(categories_json)):
            category_json = categories_json[x]

            self.category_dict[category_json['id']]=Category(category_json)

        pprint(response_json)

    # Lists all the categories by their full name. 
    def __str__(self):
        strToReturn = ""
        for category_id, category in self.category_dict.iteritems():
            strToReturn += str(category)+"\n"

        return strToReturn

    # Searches the category by ID and returns it. 
    def getCategory(self, category_id):
        return self.category_dict[category_id]

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

# EventResults stores the result of a search as a dictionary by event_id
# against a BasicEvent. 
class EventResults:
    def __init__(self, category_id_list):
        # Formulate RequestURL from constructor variables. 
        urlToRequest = self.createRequestURL(category_id_list)
        print "Requesting: " + urlToRequest
        self.response_json = json.load(urllib2.urlopen(urlToRequest))

        pprint(self.response_json)

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



