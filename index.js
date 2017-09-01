const service = 'cp-organisations-service';
const config = require('./config/config.js')();
const store = require('seneca-postgres-store');
const seneca = require('./imports')(config);

seneca.use(store, config['postgresql-store']);
const util = require('util');
const heapdump = require('heapdump');
const dgram = require('dgram');

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', shutdown);

function shutdown(err) {
  if (err !== void 0 && err.stack !== void 0) {
    console.error(`${new Date().toString()} FATAL: UncaughtException, please report: ${util.inspect(err)}`);
    console.error(util.inspect(err.stack));
    console.trace();
  }
  process.exit(0);
}

process.on('SIGUSR2', () => {
  const snapshot = `/tmp/cp-organisations-service-${Date.now()}.heapsnapshot`;
  console.log('Got SIGUSR2, creating heap snapshot: ', snapshot);
  heapdump.writeSnapshot(snapshot, (err, filename) => {
    if (err) console.error('Error creating snapshot:', err);
    console.log('dump written to', filename);
  });
});

require('./database/pg/migrate-psql-db.js')((err) => {
  if (err) {
    console.log(`Migrations Nok for ${service}`);
    console.error(err);
    process.exit(-1);
  }
  console.log(`Migrations ok for ${service}`);
  require('./network')(seneca);
});

seneca.ready(() => {
  const message = new Buffer(service);

  const client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, 11404, 'localhost', (err, bytes) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    client.close();
  });
});
