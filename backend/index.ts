import express from 'express';
import cors from 'cors';
import crypto from "crypto";
import { DBOrder, newOrderRequestBody, newProductRequestBody } from '../shared/types';
import { JsonDB, Config } from 'node-json-db';

const app = express();
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())


const db = new JsonDB(new Config("../data/hansDB", true, true, '/'))

// Products

app.get('/api/products', async (req, res) => {
    res.send(await db.getData('/products'))
})

app.get('/api/products/:id', async (req, res) => {
    res.send(await db.getData('/products[' + await db.getIndex('/products', req.params.id) + ']'))
})

app.post('/api/products', async (req, res) => {
    const { id, name, type, price, manufacturer, quantityType } = req.body as newProductRequestBody;
    if (!name || !type || !price || !manufacturer || !quantityType) {
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
    
    await db.push(`/orders[]`, dbentry)
    
    res.status(201).json(dbentry);
})

app.put('/api/orders/:id/products', async (req, res) => {
    const productId = req.body.product.id;
    const orderAmount = req.body.orderAmount;

    const orderIndex = await db.getIndex('/orders', req.params.id);
    if (orderIndex === -1) {
        // Order not found
        res.status(404).json({ error: 'Order not found' });
        return;
    }

    const orderPath = '/orders[' + orderIndex + ']';

    // Find the index of the product in the 'products' array of the order
    const products = await db.getData(orderPath + '/products');
    let productIndex = -1;
    for (let i = 0; i < products.length; i++) {
        if (products[i].productId === productId) {
            productIndex = i;
            break;
        }
    }

    if (productIndex === -1) {
        // Product not found, add it as a new product
        const dbEntry = {
            productId,
            orderAmount
        };
        await db.push(orderPath + '/products[]', dbEntry);
    } else {
        // Product exists, update its properties
        products[productIndex].orderAmount = orderAmount;
        await db.save(); // Save the changes to the database
    }

    res.status(200).json(await db.getData('/orders'));
});

  
app.get('/api/orders', async (req, res) => {
    res.send(await db.getObject<DBOrder>('/orders'))
})

app.delete('/api/order/:id', async(req, res) => {
    await db.delete('/orders[' + await db.getIndex('/orders', req.params.id) + ']')
    res.status(200).json(await db.getData('/orders')); // <- sie gönd devo us dass du nüt zrugg gisch wil normal macht ä api das au nöd
})

// App

app.listen(port, () => {
  console.log(`Hans im Glück app listening on port ${port}`)
})