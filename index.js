import http from "http";
import fs from "fs";

const PORT = "8080";

let products = [
  {
    id: 1,
    name: "Cactus",
    price: 150,
  },
  {
    id: 2,
    name: "Flower",
    price: 150,
  },
];

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, {  "Content-Type": "text/plain" });
      res.write("Hello, World!");
      res.end();
    } 
    else if (req.method === "GET" && req.url === "/products") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(products));
      res.end();
    } 
    else if (req.method === "POST" && req.url === "/") {
      let receivedData = "";
      req.on("data", (chunk) => {
        receivedData += chunk;
      });
    
      req.on("end", () => {
        console.log("Received data:", receivedData);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Received data: " + receivedData);
      });
    }
    // if(req.method==="POST" && req.url==='/products'){

    //   fs.writeFile('./products.json', JSON.stringify(products, null, 2), (error) => {
      
    //     if (error) {
    //       console.log('An error has occurred ', error);
    //       return;
    //     }
    //     console.log('Data written successfully to disk');
    //   });
    // }

    else if (req.method === "POST" && req.url === "/products") {
      let receivedData = "";
    
      req.on("data", (chunk) => {
        receivedData += chunk;
      });
    
      req.on("end", () => {
        try {
          const receivedProduct = JSON.parse(receivedData);
    
          fs.writeFile("./products.json", JSON.stringify(receivedProduct, null, 2), (err) => {
            if (err) {
              console.log("Something went wrong");
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Something went wrong" }));
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true }));
            }
          });
        } catch (error) {
          console.log("Invalid JSON format");
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid JSON format" }));
        }
      });
    }
    // else if (req.method === "POST" && req.url === "/products") {

    //   fs.writeFile("./products.txt", JSON.stringify(products), (err) => {
    //     if (err) {
    //       console.log("something went wrong");
    //     } else {
    //       console.log("file stored");
    //     }
    //   });
    //   res.end();
    // }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });
