from django.test import TestCase

class ViewsApiTestCase(TestCase):
    def test_inventory_api_returns_200(self):
        """The inventory page returns 200 status code"""
        print('SetUpTest: Inventory API returns 200 OK Status')
        print('Method: test_inventory_api_returns_200')

        response = self.client.get('/api/inventory/')

        print('The response code is: ', response.status_code)

        self.assertEqual(response.status_code, 200)
