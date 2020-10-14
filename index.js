const express = require("express"); // absolute imports at the top
const { v4 } = require("uuid");
const bodyParser = require("body-parser");

const port = 4000;

const shoppingList = [
  { id: "1", name: "milk", price: 2 },
  { id: "2", name: "sugar", price: 1 },
];

const app = express(); // creates the web app

app.use(bodyParser.json()); // express middleware

// endpoints
app.get("/", (req, res) => {
  res.json(shoppingList);
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = shoppingList.find((pr) => {
    return pr.id === productId;
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    res.end();
  }
});

app.post("/product", (req, res) => {
  const body = req.body;
  const product = {
    id: v4(),
    name: body.name,
    price: body.price,
  };
  shoppingList.push(product);
  res.json(product);
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
