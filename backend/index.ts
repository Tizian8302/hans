import express from 'express';
import cors from 'cors';
import crypto from "crypto";
import { newOrderRequestBody, newProductRequestBody, newProductToOrderRequestBody } from '../shared/types';
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

// Products

app.get('/api/products', async (req, res) => {
    res.send(await db.getData('/products'))
})

app.post('/api/products', async (req, res) => {
    const { id, name, type, price, manufacturer, quantityType } = req.body as newProductRequestBody;
    if (!name || !type || !price || !manufacturer || !quantityType) {
        console.log('hello')
        res.status(400).json({ message: "Bad Request"});
        return;
    }

    var newId: string
    if(id) {
        newId = id
    } else {
        newId = crypto.randomUUID()
    }

    const dbentry = {
        id: newId,
        name,
        type,
        price,
        manufacturer,
        quantityType
    }

    console.log("dbentry", dbentry)
    
    await db.push(`/products[]`, dbentry)
    
    res.status(201).json(await db.getData('/products'));
})

app.put('/api/products/:id', async (req, res) => {
    await db.push('/products[' + await db.getIndex('/products', req.params.id) + ']', req.body)
})


app.delete('/api/product/:id', async(req, res) => {
    await db.delete('/products[' + await db.getIndex('/products', req.params.id) + ']')
    res.status(200).json(await db.getData('/products')); 
})

// Orders

app.post('/api/orders', async (req, res) => {
    console.log("body in post orders ", req.body)
    const { id, name, wohnhaus, datum } = req.body as newOrderRequestBody;
    if (!id || !name || !wohnhaus || !datum) {
        res.status(400).json({ message: "Bad Request"});
        return;
    }

    const products: [] = []
    const dbentry = {
        id,
        name,
        wohnhaus,
        datum,
        products
    }

    console.log(dbentry)
    
    await db.push(`/orders[]`, dbentry)
    
    res.status(201).json(dbentry);
})

app.put('/api/orders/:id/products', async (req, res) => {
    console.log('PARAMS ID', req.params)
    console.log('REQ BODY', req.body)

    const {id, orderAmount} = req.body as newProductToOrderRequestBody
    const dbEntry = {
        id: id,
        orderAmount: orderAmount
    }
    await db.push('/orders[' +await db.getIndex('/orders', req.params.id) + ']/products[]', dbEntry)
    res.status(200).json(await db.getData('/orders'));
})
  
app.get('/api/orders', async (req, res) => {
    res.send(await db.getData('/orders'))
})

app.delete('/api/order/:id', async(req, res) => {
    await db.delete('/orders[' + await db.getIndex('/orders', req.params.id) + ']')
    res.status(200).json(await db.getData('/orders')); // <- sie gönd devo us dass du nüt zrugg gisch wil normal macht ä api das au nöd
})

// App

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})