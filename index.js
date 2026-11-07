const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const notes = [ 
    {id:1, text: "Check time"},
    {id: 2, text: "Spag recipie"},
    {id: 3, text: "How to do pushups"}
 ];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.send('Server is running'); 
});

app.post('/notes', (req, res) => {
    const text = req.body.text;
    if (typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({error : "text must be a non-empty string"});
    }
    const newNote = {id: notes.length + 1, text: text.trim()};
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const singleNote = notes.find((element) => element.id === id);
    if (!singleNote) {
        return res.status(404).json({error : 'note not found'});
    }
    res.json(singleNote);
});

app.get('/about', (req, res) => {
    res.send('spektas sres');
});

app.get('/profile', (req, res) => {
    res.json({
        "name" : "Spekta",
        "role" : "Software engineer",
        "skills" : ["flutter", "dart", "Get X"],
    });
});




app.listen(port, () => {
    console.log(`My app listening on port ${port}`);
});


