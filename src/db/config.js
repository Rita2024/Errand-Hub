import dotenv from 'dotenv';

dotenv.config();

export default {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_URL_TEST,
};