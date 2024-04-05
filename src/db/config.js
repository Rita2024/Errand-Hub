// Importing the 'dotenv' library/module
import dotenv from 'dotenv';

dotenv.config(); // Loading environment variables from a .env file into process.env

export default {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_URL_TEST,
};