const express = require("express");
const app = express();
const fs = require('fs')

let quotes = require("./quotes.json");

app.get('/', function (request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/:id", (req, res) => {
  if (parseInt(req.params.id)) {
    const id = req.params.id;
    const result = quotes.find((element) => {
      return element.id == id
    })
    res.json(result)
  } else {
    res.status(400).send('Send a number please')
  }
});

app.use(express.json())
app.post("/quotes", (req, res)=> { 
const newQoute = req.body
const newId = Math.max(...quotes.map((q) => q.id)) + 1
newQoute.id = newId
quotes.push(newQoute)
fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2))
res.status(201).json(newQoute)
})

app.put('/quotes/:id', (req, res)=> {
  const modifyQoute = req.body
  const id = req.params.id
  const oldQoute = quotes.find(quote => quote.id == id)
  oldQoute.quote = modifyQoute.quote
  oldQoute.author = modifyQoute.author
  fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2))
  res.status(200).json(oldQoute)
})

app.delete('/quotes/:id', (req, res)=> {
  const id = req.params.id
  const newQoutes = quotes.filter(quote=> {
    return quote.id != id
  })
  quotes = newQoutes
  fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2))
  res.status(200).json(newQoutes)
})

app.listen(3000, () => console.log("Listening on port 3000"));
