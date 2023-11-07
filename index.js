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
    else if (req.method === "POST" && req.url === "/products") {
      let receivedData = "";
    
      req.on("data", (chunk) => {
        receivedData += chunk;
      });
    
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        fs.writeFile("./products.txt", receivedData, (err) => {
          if (err) {
            console.log("Something went wrong");
            res.statusCode = 500;
            res.end("Error: Something went wrong");
          } 
        });
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
