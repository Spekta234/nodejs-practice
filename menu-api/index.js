const express = require('express');
const app = express();
app.use(express.json());
const port = 4000;
const menu = [
     { id: 1, name: "Ofada rice", price: 2500},
     {id: 2, name: "Moi Moi", price: 1800},
     {id: 3, name: "Eba and Egusi", price: 3500},
     {id: 4, name: "Meat pie", price: 2000}
];
let newMenuId = 5;

app.get('/menu', (req, res) => {
    res.json(menu);
});

app.post('/menu', (req, res) => {
    const name = req.body.name;
    if (typeof name !== "string" || name.trim() === '') {
        return res.status(400).json({error: "name must be a non-empty string"});
    }
    const price = req.body.price;
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0 ) {
        return res.status(400).json({error: "price must be a number greater than zero"});
    };

    const newMenu = {id: newMenuId, name: name, price: price};
    newMenuId ++;
    menu.push(newMenu);
    res.status(201).json(newMenu);
});



app.get('/menu/:id', (req, res) => {

});

app.listen(port, () => {
    console.log(`My app listening on port ${port}`);
});