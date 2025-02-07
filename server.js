const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DBLocal = process.env.DATABASE;

mongoose.connect(DBLocal).then(() => {
  console.log('DB connection successful!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
