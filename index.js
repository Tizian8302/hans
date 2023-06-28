const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})