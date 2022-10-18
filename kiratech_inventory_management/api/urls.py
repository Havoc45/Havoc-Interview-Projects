from django.urls import path, re_path
from .views import *

urlpatterns = [
    path('inventory/', viewInventoryApi, name= 'viewInventoryApi'),
    path('inventory/<str:name>/', viewInventoryApi, name= 'viewSingleInventoryApi'),
]
