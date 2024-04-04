import { Pool } from 'pg'; // Importing the Pool class from 'pg' for handling database connections
import dotenv from 'dotenv'; // Importing the 'dotenv' library/module for loading environment variables

dotenv.config(); // Loading environment variables from a .env file into process.env

const pool = new Pool({
  user: process.env.PGUSER, // Setting the user for the database connection
  host: process.env.PGHOST, // Setting the host for the database connection
  database: process.env.PGNDATABASE, // Setting the database name for the connection
  port: process.env.PGPORT, // Setting the port for the database connection
  password: process.env.PGPASSWORD, // Setting the password for the database connection
});

function query(text, params) {
  return new Promise((resolve, reject) => {
    // Executing a query using the pool connection
    pool.query(text, params)
      .then((res) => {
        resolve(res); // Resolving with the result of the query
      })
      .catch((err) => {
        reject(err); // Rejecting with the error if the query fails
      });
  });
}
export default {
  query,
};