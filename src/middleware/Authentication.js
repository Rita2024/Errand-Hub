// Disabling eslint rule for consistent return statements

import jwt from 'jsonwebtoken'; // Importing the 'jsonwebtoken' library for working with JWT tokens
import db from '../db'; // Importing the 'db' module for database operations

const Auth = {
  // Middleware function to verify JWT token
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token']; // Extracting the token from request headers
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' }); // Sending error if token is not provided
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET); // Verifying the token using the provided secret key
      const text = 'SELECT * FROM users WHERE id = $1'; // SQL query to retrieve user data based on decoded token
      const { rows } = await db.query(text, [decoded.userId]); // Executing the query with user ID from decoded token

      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' }); // Sending error if no user found for the decoded token
      }
      req.user = { id: decoded.userId }; // Setting user ID in request object for further middleware or route handling
      next(); // Proceeding to next middleware or route handling
    } catch (error) {
      return res.status(400).send(error); // Sending error if token verification fails
    }
  },
  // Middleware function to secure routes accessible only to admins
  async secureRoute(req, res, next) {
    try {
      const text = 'SELECT * FROM users WHERE id = $1'; // SQL query to retrieve user data based on user ID in request
      const { rows } = await db.query(text, [req.user.id]); // Executing the query with user ID from request object
      if (rows[0].user_role !== 'ADMIN') {
        return res.status(403).send({ message: 'Forbidden', status: 403 }); // Sending forbidden error if user is not an admin
      }
      next(); // Proceeding to next middleware or route handling if user is an admin
    } catch (error) {
      return res.status(400).send({ message: error }); // Sending error if database query fails
    }
  },
};

export default Auth;
