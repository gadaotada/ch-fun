const express = require("express");
const next = require("next");
const cron = require('node-cron');

const { CreateDailyTasks } = require('./crons/tasks.js')

const hostname = 'localhost'
const port = 3000

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const runCronJobs = () => {
    cron.schedule('1 0 * * *', async function() {
      console.log('Running a task every day at 00:01');
      await CreateDailyTasks()
    });
};

app.prepare().then(() => {
    const server = express();

    server.use("/memes", express.static(__dirname + "/public/memes"));

    server.all("*", (req, res) => {

      return handle(req, res);

    });

    runCronJobs();

    server.listen(port, (err) => {

      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);

  });

});