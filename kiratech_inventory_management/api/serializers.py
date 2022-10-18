from rest_framework import serializers
from inventory.models import *

class InventorySerializers(serializers.ModelSerializer):
  
  supplier = serializers.StringRelatedField(read_only = True)

  class Meta:
    model = Inventory
    fields = ['name','supplier','availability',]