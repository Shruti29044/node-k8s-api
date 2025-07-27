const express = require('express');
const app = express();
const client = require('prom-client');
const PORT = process.env.PORT || 3000;

// Create a basic counter
const counter = new client.Counter({
  name: 'node_api_requests_total',
  help: 'Total number of API requests',
});

app.use((req, res, next) => {
  counter.inc(); // increment on every request
  next();
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
