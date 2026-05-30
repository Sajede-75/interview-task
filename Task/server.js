const http = require("http");
const { URL } = require("url");
 
const items = [];
 
for (let i = 1; i <= 56; i++) {
  items.push({
    id: i,
    title: `Item ${i}`,
    description: `This is description for item ${i}`,
    createdAt: new Date(Date.now() - i * 1000 * 60).toISOString(),
  });
}
 
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.startsWith("/items")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const skip = parseInt(url.searchParams.get("skip")) || 0;
    const take = parseInt(url.searchParams.get("take")) || 10;
 
    const pagedItems = items.slice(skip, skip + take);
 
    const response = {
      total: items.length,
      skip,
      take,
      data: pagedItems,
    };
 
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

 
const PORT = 3020;
 
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});