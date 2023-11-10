import express, { ErrorRequestHandler, Express, Request, Response } from "express"; //creating the express interface
import dotenv from "dotenv";
import fs from "fs/promises";
import { type } from "os";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Product {
    id: number
    name: string;
    price: number;
  }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world!!!");
});

app.get("/products", async (req: Request, res: Response) => {
//   const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
//   res.status(200).send(products);
  try {
    const productsJson = await fs.readFile("products.json", "utf-8");
    const products: Product[] = JSON.parse(productsJson);
    res.status(200).send(products);
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  return res.sendStatus(200)
});

app.post("/products", async (req: Request<{}, {}, Product>, res: Response) => {
    try {
      const productsJson = await fs.readFile("products.json", "utf-8");
      const products: Product[] = JSON.parse(productsJson);
  
      const valueID = parseInt(new Date().getTime().toString());
      const product: Product = {
        id: valueID,
        name: req.body.name,
        price: Number(req.body.price),
      };
  
      products.push(product);
  
      await fs.writeFile("products.json", JSON.stringify(products));
  
      res.status(201).send({ product });
    } catch (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Internal server error");
    }
  });

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
