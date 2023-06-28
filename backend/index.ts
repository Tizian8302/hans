import express from 'express';
import cors from 'cors';
import crypto from "crypto";
import { newOrderRequestBody } from '../shared/types';
import { JsonDB, Config } from 'node-json-db';

const app = express();
const port = 3000

app.use(cors())
app.use(express.static('public'))

const db = new JsonDB(new Config("../data/hansDB", true, false, '/'))



app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
    res.json([
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

app.post('/api/orders', async (req, res) => {
    const { name, wohnhaus, datum } = req.body as newOrderRequestBody;
  
    // TODO: Perform any necessary validation or processing of the order data
    if (!name || !wohnhaus || !datum) {
        res.status(400).json({ message: "Bad Request"});
        return;
    }
  
    const dbentry = {
        id: crypto.randomUUID(),
        name,
        wohnhaus,
        datum,
        Array
    }
    // TODO: Save the order to your database or perform any other required actions
    // Return a success response
    res.status(201).json({ message: 'Order created successfully' });
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})