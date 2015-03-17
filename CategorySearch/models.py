import urllib2
import json
from pprint import pprint

# The Categories Object is a list containing category objects. 
# This list is stored under 
class Categories:
    def __init__(self):
        self.response = urllib2.urlopen('https://www.eventbriteapi.com/v3/categories/?token=BKKRDKVUVRC5WG4HAVLT')
        self.response_json = json.load(self.response)
        self.categories_json = self.response_json['categories']
        self.category_dict={}

        # Populate the category dictionary with each category_json by
        # calling the constructor for the category object. 
        for x in range(0, len(self.categories_json)):
            self.category_json = self.categories_json[x]

            self.category_dict[self.category_json['id']]=Category(self.category_json)

    # Searches the category by ID and returns it. 
    def getCategory(self, category_id):
        return self.category_dict[category_id]

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
