import mongoose from 'mongoose';
import app from './app';

// Make sure we are running at node 8.11+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 8 || (major === 8 && minor <= 10)) {
  console.log('NODE VERSION < 8.11 - upgrade nodejs to 8.11 or greater!');
  process.exit();
}

// Import environment variables from .env file
require('dotenv').config({ path: '.env' });

// Connect to database and handle any bad connections
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true },
);
mongoose.Promise = global.Promise; // tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`DATABASE CONNECTION ERROR -> ${err.messsage}`);
});

// Start the party!
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
