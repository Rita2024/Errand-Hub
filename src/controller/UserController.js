/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from './HelperController';
import db from '../db';
import User from '../model/user';

const userRoles = {
  ADMIN: 'ADMIN',
  NORMAL: 'NORMAL',
};

const Users = {
  async signup(req, res) {
    const {
      email, username, firstName, lastName, password,
    } = req.body;

    // Creating a new User object with provided data
    const newUser = new User(uuidv4(), email, username, firstName, lastName, userRoles.ADMIN,
      Helper.hashPassword(password), moment(new Date()), moment(new Date()));

    // Query to insert the new user into the database
    const createQuery = 'INSERT INTO users(id, email, username, first_name, last_name, user_role, password, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';

    try {
      // Executing the insert query with values of the new user
      const { rows } = await db.query(createQuery, Object.values(newUser));
      // Generating a token for the new user
      const token = Helper.generateToken(rows[0].id);
      // Sending success response with token
      return res.status(201).send({
        message: 'Account Created Successfully', status: 201, token,
      });
    } catch (error) {
      // Handling errors
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ message: `User '${req.body.email}' already exist`, status: 409 });
      }
      return res.status(400).send(error);
    }
  },
  
  // Other methods for user operations...
};

export default Users;