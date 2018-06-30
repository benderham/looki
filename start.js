// Make sure we are running at node 8.11+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 8 || (major === 8 && minor <= 10)) {
  console.log('NODE VERSION < 8.11 - upgrade nodejs to 8.11 or greater!');
  process.exit();
}

// Import environment variables from .env file
require('dotenv').config({ path: '.env' });

// Start the party!
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
