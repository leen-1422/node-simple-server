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

http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.write("Hello, World!");
    res.end();
  }
  else if (req.method === "GET" && req.url === "/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } 
  else if (req.method === "POST" && req.url === "/"){
    console.log('Post request')
    res.end();
    

  }
  else if (req.method === "POST" && req.url === "/products") {
    fs.writeFile('./products.txt',JSON.stringify(products), (err)=>{
      if(err){
        console.log('something went wrong')
      }else {
        console.log('file stored')
      }
    })
    res.end();
    
    
  }
}).listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
