const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const {sequelize} = require('./config/db.js');
// add necessary imports below: Morgan and endPointNotFound
const morgan = require('morgan');
const {endPointNotFound} = require('./utils/middlewares.js');
const dotenv = require('dotenv').config();

// Enable CORS for all routes and methods
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

/**
 * TODO: apply Morgan middleware (dev): https://expressjs.com/en/resources/middleware/morgan.html
 */
app.use(morgan('dev'));
/* TODO: End */


const index = require('./routes/index');
/**
 * TODO: include books and authors route
 */
const booksRouter = require('./routes/books.js');
const authorsRouter = require('./routes/authors.js') 
/* TODO: End */

app.use('/', index)
/**
 * TODO: use books and authors route
 */
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
/* TODO: End */


/**
 * TODO: apply unknown endpoints (endPointNotFound) middleware
 */
app.use(endPointNotFound);
/* TODO: End */


// Exporting  the app for testing puporses
module.exports = app;

async function init() { // async for future additions below
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }

  if (process.env.TESTING.toLowerCase() !== "true"){
    try{
      await sequelize.sync({ force: true });
      console.log('Models (re)created!');
    } catch (error) {
      console.error('Unable to sync database:', error);
      return;
    }
  }

  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  }
}

init();


