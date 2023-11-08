import http from "http";
import fs from "fs/promises";
import { parse } from "querystring";

const PORT = "8080";

http
  .createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/") {
      try {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello, World!");
        res.end();
      } catch {
        res.write(err.message);
        res.end();
      }
    } else if (req.method === "GET" && req.url === "/products") {
      try {
        const products = JSON.parse(
          await fs.readFile("products.json", "utf-8")
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(products));
        res.end();
      } catch (err) {
        res.write(err.message);
        res.end();
      }
    } else if (req.method === "POST" && req.url === "/") {
      let receivedData = "";
      req.on("data", (chunk) => {
        receivedData += chunk;
      });

      req.on("end", () => {
        console.log("Received data:", receivedData);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Received data: " + receivedData);
      });
    } else if (req.method === "POST" && req.url === "/products") {
      try {
        let receivedData = "";

        req.on("data", (chunk) => {
          receivedData += chunk;
          console.log(receivedData);
        });
        req.on("end", async () => {
          console.log("Received data:", parse(receivedData));
          const valueID = parseInt(new Date().getTime());
          const parsedData = parse(receivedData);

          const product = {
            id: valueID,
            ...parsedData,
          };

          const products = JSON.parse(
            await fs.readFile("products.json", "utf-8")
          );
          products.push(product);
          await fs.writeFile(
            "./products.json",
            JSON.stringify(products),
            (err) => {
              if (err) {
                console.error("Error writing to file:", err);
              } else {
                console.log("Products data written to file");
              }
            }
          );
        });
        res.writeHead(201, { "Content-Type": "application/json" });

        res.end();
      } catch {
        res.write(err.message);
        res.end();
      }
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });
