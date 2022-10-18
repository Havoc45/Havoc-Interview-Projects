from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from .serializers import *
from inventory.models import *

@api_view(['GET'])
def viewInventoryApi(request, name=None):

  if name is None:

    data = Inventory.objects.all()

  else:
    if Inventory.objects.filter(name = name).exists():
      data = Inventory.objects.filter(name = name)
    else:
      return Response({'response': 404, 'message': 'Inventory requested does not exist or has been deleted.'})
    
  serializer = InventorySerializers(data, many = True)
  return Response(serializer.data)