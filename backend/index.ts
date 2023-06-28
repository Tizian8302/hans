import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
    res.send([
        {
            name: 'Apfel',
            type: 'Frucht',
            price: 1.5,
            manufacturer: 'Migros',
            quantityType: 'Stk'
        }, {
            name: 'Birne',
            type: 'Frucht',
            price: 1.2,
            manufacturer: 'Coop',
            quantityType: 'Stk'
        }
    ])
})

app.post('/api/orders', (req, res) => {
    const { name, wohnhaus, datum } = req.body;
  
    // TODO: Perform any necessary validation or processing of the order data
  
    // TODO: Save the order to your database or perform any other required actions
  
    // Return a success response
    res.status(201).json({ message: 'Order created successfully' });
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})