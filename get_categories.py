import urllib2
import json
from pprint import pprint

category_response = urllib2.urlopen('https://www.eventbriteapi.com/v3/categories/?token=BKKRDKVUVRC5WG4HAVLT')
category_json = json.load(category_response)
#pprint(category_json)
print "Finished printing category_json"

for x in range (0, len(category_json['categories'])): 
    pprint(category_json['categories'][x]['name'])
