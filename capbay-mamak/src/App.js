import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

function App() {
  const [key, setKey] = useState('checkout');
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState({
    b001: 2.5,
    b002: 2,
    f001: 1.5,
    f001_discount: 1.2,
  })
  const [foodPrice,setFoodPrice] = useStateWithCallbackLazy({
    b001 : 0,
    b002: 0,
    f001: 0,
  })
  const [foodQty, setFoodQty] = useState({
    b001 : 0,
    b002: 0,
    f001: 0,
  })
  const [checkoutTotal,setcheckoutTotal] = useState([])

  const handleTotalPrice = (f) => {
    var updatedValue = 0;
    var foodPriceObject = f
    
    Object.entries(foodPriceObject).map(([key, value]) => (
      updatedValue = updatedValue + value
    ))
    
    setTotalPrice(updatedValue);
  }

  const handleChange = (e) => {
    e.preventDefault()
    var updatedValue = {};
    var tempNum = Number(e.target.value)
    var updatedFoodQty = { [e.target.name] : Number(tempNum) }
    const beverageArray = ['b001','b002']
    if(tempNum && tempNum !== 0){
      if(beverageArray.includes(e.target.name)){
        if(tempNum%2 === 0){
          updatedValue = {[e.target.name] : +((tempNum/2)*price[e.target.name]).toFixed(1)}
        } else {
          if(tempNum === 1){
            updatedValue = {[e.target.name] : price[e.target.name]}
          } else {
            updatedValue = {[e.target.name] : +((((tempNum-1)/2)*price[e.target.name])+price[e.target.name]).toFixed(1)}
          }
        }
      } else {
        if(tempNum >= 2){
          updatedValue = {[e.target.name] : +(tempNum*price[`${e.target.name}_discount`]).toFixed(1)}
        } else {
          updatedValue = {[e.target.name] : +(tempNum*price[e.target.name]).toFixed(1)}
        }
      }
    } else {
      updatedValue = {[e.target.name] : 0}
    }

    setFoodQty(foodQty => 
      ({
        ...foodQty,
        ...updatedFoodQty,
      })
    )

    setFoodPrice(foodPrice => 
      ({
        ...foodPrice,
        ...updatedValue,
      }), (f) => {
        handleTotalPrice(f)
      }
    )

  }

  const handlePriceChange = (e) => {
    e.preventDefault()
    var updatedValue ={}
    if(e.target.value){
      updatedValue = {[e.target.name] : +(e.target.value)};
    } else {
      updatedValue = {[e.target.name] : 0};
    }
    
    setPrice(price => 
    ({
      ...price,
      ...updatedValue,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var foodCodeArray = ['b001','b002','f001']
    var foodArray= []
    foodCodeArray.forEach((code, index) => {
      foodArray.push({
        code: code,
        quantity: foodQty[code],
        price: price[code],
        total: foodPrice[code],
      })
    })
    var updatedValue = {
      id : checkoutTotal.length + 1,
      order: foodArray,
      total: totalPrice,
    }

    setcheckoutTotal([...checkoutTotal, updatedValue])
    setTotalPrice(0)
    setFoodQty({
      b001 : 0,
      b002: 0,
      f001: 0,
    })
    setFoodPrice({
      b001 : 0,
      b002: 0,
      f001: 0,
    })

    console.log(checkoutTotal)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className='my-3'>Capbay Mamak POS</h1>
        </header>
        <div className='square border'>
          <Tabs
            id="capbay-mamak-pos-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mx-3"
            fill
          >
            <Tab tabClassName='tab-header' eventKey="checkout" title="Checkout">
              <div>
                <h3 className='mb-3'>Checkout</h3>
                <div className='table-body'>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className='table-header'>{' '}{' '} Total {' '}{' '}</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B001</td>
                        <td>Kopi</td>
                        <td>RM {price.b001}</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon1">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon1"
                                name='b001'
                                onChange={(e) => {handleChange(e)}}
                                value = {foodQty.b001}
                              />
                            </InputGroup>
                          </div>
                        </td>
                        <td>{' '}{' '} RM {foodPrice.b001} {' '}{' '}</td>
                      </tr>
                      <tr>
                        <td>B002</td>
                        <td>Teh Tarik</td>
                        <td>RM {price.b002}</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon2">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon2"
                                name = 'b002'
                                onChange={(e) => {handleChange(e)}}
                                value = {foodQty.b002}
                              />
                            </InputGroup>
                          </div>
                        </td>
                        <td>{' '}{' '} RM {foodPrice.b002} {' '}{' '}</td>
                      </tr>
                      <tr>
                        <td>F001</td>
                        <td>Roti Kosong</td>
                        <td>RM {price.f001}</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon3">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon3"
                                name = 'f001'
                                onChange={(e) => {handleChange(e)}}
                                value = {foodQty.f001}
                              />
                            </InputGroup>
                          </div>
                        </td>
                        <td>{' '}{' '} RM {foodPrice.f001} {' '}{' '}</td>
                      </tr>
                      <tr>
                        <td colSpan={3}><strong>TOTAL PRICE</strong></td>
                        <td><Button variant="outline-success" size='lg' onClick={(e) => {handleSubmit(e)}}>Submit</Button>{' '}</td>
                        <td><strong>RM {totalPrice}</strong></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab tabClassName='tab-header' eventKey="history" title="History">
              <div>
                <h3 className='mb-3'>History</h3>
                <div className='table-body'>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <th>No.</th>
                      <th>Checkout</th>
                    </thead>
                    <tbody>  
                      { checkoutTotal !== []
                      ?
                        checkoutTotal.map((value,key) => {
                          console.log(value)
                          return (
                            <tr key={key}>
                              <td>{value.id}</td>
                              <td>
                                <InputGroup>
                                  <Form.Control disabled as="textarea" aria-label="With textarea" value={JSON.stringify(value)} />
                                </InputGroup>
                              </td>
                            </tr>
                          )
                        })  
                      :
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      }
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab tabClassName='tab-header' eventKey="price_change" title="Price Change">
              <div>
                <h3 className='mb-3'>Price Change</h3>
                <div className='table-body'>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Price</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B001</td>
                        <td>Kopi</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon1">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon1"
                                name='b001'
                                onChange={(e) => {handlePriceChange(e)}}
                                defaultValue = {price.b001}
                              />
                            </InputGroup>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>B002</td>
                        <td>Teh Tarik</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon2">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon2"
                                name = 'b002'
                                onChange={(e) => {handlePriceChange(e)}}
                                defaultValue = {price.b002}
                              />
                            </InputGroup>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>F001</td>
                        <td>Roti Kosong</td>
                        <td className='input-body'>
                          <div>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="price-addon3">RM</InputGroup.Text>
                              <Form.Control
                                placeholder="Quantity"
                                aria-label="Quantity"
                                aria-describedby="price-addon3"
                                name = 'f001'
                                onChange={(e) => {handlePriceChange(e)}}
                                defaultValue = {price.f001}
                              />
                            </InputGroup>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
