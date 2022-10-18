from django.urls import path, re_path
from .views import *

urlpatterns = [
  path('', redirect_to_inventory),
  path('inventory/', viewInventory, {'name': None}, name='viewInventories'),
  path('inventory/<int:id>/', viewIdInventory, name='viewInventoryById'),
  path('inventory/<str:name>/', viewInventory, name='viewInventoryByName'),
]