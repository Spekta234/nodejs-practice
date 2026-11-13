const e = require('express');
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
    const price = req.body.price;
    const error = validateMenuItem(req.body)
    if (error) {
      return res.status(400).json({error: error});
    };
    
    


    const newMenu = {id: newMenuId, name: name.trim(), price: price};
    newMenuId ++;
    menu.push(newMenu);
    res.status(201).json(newMenu);
});

app.get('/menu/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = menu.find((element) => element.id === id);
    if(!item) {
        return res.status(404).json({error: "Item not found"})
    };
    res.json(item);
});

app.put('/menu/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = menu.find((element) => element.id === id);
    if(!item) {
        return res.status(404).json({error: "Item not found"})
    };

    const name = req.body.name;
    const price = req.body.price;
    const error = validateMenuItem(req.body) ;
    if (error) {
       return res.status(400).json({error : error});
    };

    item.name = name.trim();
    item.price = price;
    res.status(200).json(item);
});


function validateMenuItem(body) {
    const name = body.name;
    const price = body.price;

    if (typeof name !== "string" || name.trim() === '') {
        return "name must be a non-empty string";
    } 
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0 ) {
        return "price must be a number greater than zero";
    }
    return null;
}

app.delete('/menu/:id', (req, res) => {
    const id = Number(req.params.id);
    const menuIndex = menu.findIndex((element) => element.id === id);
    if (menuIndex === -1) {
        return res.status(404).json({error: "Item not found"})
    };

    menu.splice(menuIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`My app listening on port ${port}`);
});