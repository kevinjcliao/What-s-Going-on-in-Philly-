# -*- coding: utf-8 -*-
import urllib2
import json
from pprint import pprint
import collections

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

        # Sort categories. 
        self.category_dict = collections.OrderedDict(sorted(self.category_dict.items()))

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


