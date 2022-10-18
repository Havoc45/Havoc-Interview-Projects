from email.policy import default
from tabnanny import verbose
from django.db import models

class Supplier(models.Model):
  name  = models.CharField( verbose_name= 'Name', max_length= 256, null= False, blank= False)

  def __str__(self):
    return f'{self.name}'

class Inventory(models.Model):
  name = models.CharField(verbose_name= 'Name', max_length= 256, null= False, blank= False)
  description = models.CharField( verbose_name= 'Description', max_length= 256, null= True, blank= True)
  note = models.TextField(verbose_name= 'Note', null= True, blank= True)
  stock = models.IntegerField(verbose_name= 'Stock')
  availability = models.BooleanField(verbose_name= 'Availability', default= False)
  supplier = models.ForeignKey('Supplier', on_delete = models.CASCADE,)

  def __str__(self):
    return f'{self.name}'
