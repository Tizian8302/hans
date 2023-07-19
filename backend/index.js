"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const node_json_db_1 = require("node-json-db");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
const db = new node_json_db_1.JsonDB(new node_json_db_1.Config("../data/hansDB", true, true, '/'));
// Products
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db.getData('/products'));
}));
app.get('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db.getData('/products[' + (yield db.getIndex('/products', req.params.id)) + ']'));
}));
app.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, type, price, manufacturer, quantityType } = req.body;
    if (!name || !type || !price || !manufacturer || !quantityType) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    var newId;
    if (id) {
        newId = id;
    }
    else {
        newId = crypto_1.default.randomUUID();
    }
    const dbentry = {
        id: newId,
        name,
        type,
        price,
        manufacturer,
        quantityType
    };
    yield db.push(`/products[]`, dbentry);
    res.status(201).json(yield db.getData('/products'));
}));
app.put('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.push('/products[' + (yield db.getIndex('/products', req.params.id)) + ']', req.body);
    res.status(200).json(yield db.getData('/products'));
}));
app.delete('/api/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.delete('/products[' + (yield db.getIndex('/products', req.params.id)) + ']');
    res.status(200).json(yield db.getData('/products'));
}));
// Orders
app.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, wohnhaus, datum } = req.body;
    if (!id || !name || !wohnhaus || !datum) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    const products = [];
    const dbentry = {
        id,
        name,
        wohnhaus,
        datum,
        products
    };
    yield db.push(`/orders[]`, dbentry);
    res.status(201).json(dbentry);
}));
app.put('/api/orders/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.body.product.id;
    const orderAmount = req.body.orderAmount;
    const orderIndex = yield db.getIndex('/orders', req.params.id);
    if (orderIndex === -1) {
        // Order not found
        res.status(404).json({ error: 'Order not found' });
        return;
    }
    const orderPath = '/orders[' + orderIndex + ']';
    // Find the index of the product in the 'products' array of the order
    const products = yield db.getData(orderPath + '/products');
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
        yield db.push(orderPath + '/products[]', dbEntry);
    }
    else {
        // Product exists, update its properties
        products[productIndex].orderAmount = orderAmount;
        yield db.save(); // Save the changes to the database
    }
    res.status(200).json(yield db.getData('/orders'));
}));
app.get('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db.getObject('/orders'));
}));
app.delete('/api/order/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.delete('/orders[' + (yield db.getIndex('/orders', req.params.id)) + ']');
    res.status(200).json(yield db.getData('/orders')); // <- sie gönd devo us dass du nüt zrugg gisch wil normal macht ä api das au nöd
}));
// App
app.listen(port, () => {
    console.log(`Hans im Glück app listening on port ${port}`);
});
