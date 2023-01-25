const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //!!!!!

const app = require('./app');


// ----------------------------------------------------------------

const { DB_HOST, PORT = 3000 } = process.env;



//! 3-вариант NEW
// async function main() {
(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log(`Server is running on the port: ${PORT} `.bgGreen.red);
    console.log(`Start Pet Project: React HW-8 (Frontend) + Node.js (Backend) `.bgRed.green);
    console.log('Database connection successful '.bgBlue.yellow);
    console.log('---------------------------------------'.yellow);
  } catch (error) {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  }
})();
