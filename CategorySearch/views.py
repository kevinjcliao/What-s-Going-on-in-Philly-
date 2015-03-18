from django.shortcuts import render
from CategorySearch.models import *

def index(request):
    Current_Categories = Categories()
    print(Current_Categories)
    context = {'Categories': Current_Categories.getCategoryDict()}
    return render(request, 'index.html', context)
