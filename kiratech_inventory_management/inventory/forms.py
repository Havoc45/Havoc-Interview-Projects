from django import forms 
from .models import *

class InventoryForm(forms.ModelForm):

  name =  forms.CharField( label = ('name'),required= False, widget=forms.TextInput(
		attrs= {
		  'disabled':'true',
        }
    ))

  description =  forms.CharField( label = ('Description'),required= False, widget=forms.TextInput(
		attrs= {
		  'disabled':'true',
        }
    ))

  note =  forms.CharField( label = ('Note'),required= False, widget=forms.Textarea(
		attrs= {
		  'disabled':'true',
        }
    ))

  stock =  forms.CharField( label = ('Stock'),required= False, widget=forms.TextInput(
		attrs= {
		  'disabled':'true',
        }
    ))
  
  availability =  forms.CharField( label = ('Stock'),required= False, widget=forms.TextInput(
		attrs= {
		  'disabled':'true',
        }
    ))

  supplier =  forms.CharField( label = ('Supplier'),required= False, widget=forms.TextInput(
		attrs= {
		  'disabled':'true',
        }
    ))

  class Meta:
    model = Inventory
    fields = '__all__'
    exclude = ['supplier',]