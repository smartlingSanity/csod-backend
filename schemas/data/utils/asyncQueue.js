/* p-queue module is used to orchestrate concurrent requests.
Sanity's server will collapse if we make a lot of requests at once.
It is the Sanity's recommended way to perform concurrent requests. */
const { default: PQueue } = require('p-queue');

const queue = new PQueue({
  concurrency: 10,
  interval: 5000,
  intervalCap: 10,
  timeout: 5000,
});

module.exports = { default: queue };
