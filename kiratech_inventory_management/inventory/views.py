from django.shortcuts import render, redirect
from django.http import Http404
from operator import attrgetter

from .models import Inventory
from .forms import *

def redirect_to_inventory(request):

  return redirect('viewInventories')

def viewInventory(request, name):

  if request.method == 'GET':

    if(name is None):
      context = {
        'title': 'Inventory Management',
        'base': 'true',
        'name': name
      }

    else:
      context = {
      'title': 'Inventory Management',
      'base': 'false',
      'name': name
    }

    return render(request,'inventory/dashboard.html', context)

def viewIdInventory(request, id):

  lookup_names = ['name','description','note','stock','availability','supplier.name']
  field_names = ['name','description','note','stock','availability','supplier']
  data ={}

  if request.method == 'GET':
    if Inventory.objects.filter(id = id).exists():
      inventoryobj = Inventory.objects.filter(id = id)
    else:
      raise Http404('Inventory requested does not exist or has been deleted.')
    
    atgetters = [attrgetter(ln) for ln in lookup_names]

    for obj in inventoryobj:
      for i,at in enumerate(atgetters):
        data[field_names[i]] = at(obj)

    form = InventoryForm(data)

    context = {
      'title': 'View Inventory',
      'form': form
    }

    return render(request,'inventory/viewInventoryById.html', context)
