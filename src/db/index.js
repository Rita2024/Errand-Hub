/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import { Pool } from 'pg';
import dotenv from 'dotenv';
// import dbconfig from './config';

dotenv.config();

// const env = process.env.NODE_ENV || 'development';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
});

function query(text, params) {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default {
  query,
};