from django.test import TestCase
from .models import *

class ViewsTestCase(TestCase):
    def test_inventory_returns_200(self):
        """The inventory page returns 200 status code"""
        print('\n')
        print('SetUpTest: Inventory page returns 200 OK Status')
        print('Method: test_inventory_returns_200')

        response = self.client.get('/inventory/')

        print('The response code is: ', response.status_code)

        self.assertEqual(response.status_code, 200)

    def test_single_inventory_returns_200(self):
      """The single inventory page returns 200 status code"""
      print('\n')
      print('SetUpTest: Single inventory page returns 200 OK Status')
      print('Method: test_single_inventory_returns_200')

      supplier = Supplier.objects.create(name = 'Test Supplier')

      print(f'Supplier is {supplier.name} and id is {supplier.id}')

      inventory = Inventory.objects.create(name='Sample1', description='Testing Sample', note='Testing this from unit testing', \
        stock=0, availability=True, supplier=supplier)

      print(f'Inventory is successful. Inventory name is {inventory.name} and id is {inventory.id}')

      response = self.client.get(f'/inventory/{inventory.id}/')

      print('The response code is: ', response.status_code)

      self.assertEqual(response.status_code, 200)

      

