from atexit import register
from django.contrib import admin
from inventory.models import *

admin.site.register(Supplier)
admin.site.register(Inventory)
