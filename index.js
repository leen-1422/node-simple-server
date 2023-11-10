import express from "express";
import "dotenv/config";
import fs from "fs/promises";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.get("/products", async (req, res) => {
  const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
  res.status(200).send(products);

  if (!products) {
    res.status(404).send("products not found!");
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).send(req.body);
});

app.post("/products", async (req, res) => {
  console.log(req.body);
  const valueID = parseInt(new Date().getTime());

  const product = {
    id: valueID,
    name: req.body.name,
    price: Number(req.body.price),
  };
  const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
  products.push(product);
  await fs.writeFile("./products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Products data written to file");
    }
  });
  console.log(product);
  res.status(201).send({ product });
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
