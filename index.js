const express = require('express');
const os = require('os-utils');
const process = require('process');

const app = express();

const data = [];

app.get('/', (req, res) => {
  // Obtem informações de uso de memória
  const memUsage = process.memoryUsage();
  const rss = memUsage.rss;
  const heapTotal = memUsage.heapTotal;
  const heapUsed = memUsage.heapUsed;

  // Obtem informações de uso de CPU
  os.cpuUsage((cpuUsage) => {
    const cpu = cpuUsage * 100;

    // Retorna as informações no corpo da resposta
    data.push(`CPU usage: ${cpu}%\nRSS: ${rss}\nHeap total: ${heapTotal}\nHeap used: ${heapUsed}`);
    console.info(`\n${data[data.length-1]}`);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
