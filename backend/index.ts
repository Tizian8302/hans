import express from 'express';
import cors from 'cors';
import crypto from "crypto";
import { newOrderRequestBody } from '../shared/types';
import { JsonDB, Config } from 'node-json-db';

const app = express();
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

const db = new JsonDB(new Config("../data/hansDB", true, true, '/'))

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
    console.log("body in post orders ", req.body)
    const { name, wohnhaus, datum } = req.body as newOrderRequestBody;
    if (!name || !wohnhaus || !datum) {
        res.status(400).json({ message: "Bad Request"});
        return;
    }

    const products: [] = []
    const dbentry = {
        id: crypto.randomUUID(),
        name,
        wohnhaus,
        datum,
        products
    }

    console.log(dbentry)
    
    await db.push(`/orders[]`, dbentry)
    
    res.status(201).json(await db.getData('/orders'));
})
  
app.get('/api/orders', async (req, res) => {
    res.send(await db.getData('/orders'))
})

app.delete('/api/order/:id', async(req, res) => {
    console.log('im here', req.params.id)
    await db.delete('/orders[' + await db.getIndex('/orders', req.params.id) + ']')
    res.status(200).json(await db.getData('/orders')); // <- sie gönd devo us dass du nüt zrugg gisch wil normal macht ä api das au nöd
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})