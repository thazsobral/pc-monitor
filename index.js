import express from "express";
import os from "os-utils";
import process from "process";

const app = express();

const port = 3000;
const data = [];

app.get('/', (_, res) => {
  const memUsage = process.memoryUsage();
  const rss = memUsage.rss;
  const heapTotal = memUsage.heapTotal;
  const heapUsed = memUsage.heapUsed;

  os.cpuUsage((cpuUsage) => {
    const cpu = cpuUsage * 100;

    data.push(`CPU usage: ${cpu}%\nRSS: ${rss}\nHeap total: ${heapTotal}\nHeap used: ${heapUsed}`);
    console.info(`\n${data[data.length-1]}`);
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
