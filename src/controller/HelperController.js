// We're disabling a rule that makes sure we use the same style for returning values.
// This is just a way to make our code look nicer.
/* eslint-disable consistent-return */

// We're importing two special tools we'll use later: bcrypt and jwt.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// We're creating a special helper object to do useful things.

const Helper = {
  // This function checks if an email looks like a proper email.
  isValidEmail(email) {
    // It's like asking if a word matches a certain pattern.
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true; // If it matches, we say it's a good email.
    }
    return false; // If not, we say it's not a good email.
  },
  
  // This function makes a password into a secret code.
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  // This function checks if a password matches a secret code.
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  
  // This function checks if a user's role is set properly.
  validateUserRole(req, res, next) {
    if (Helper.isValidatEmpty(req.body.userRole)) {
      return res.status(400).send({ message: 'User role is required', status: 400 });
    }
    next();
  },
  
  // This function checks if a status is set properly.
  validateStatus(req, res, next) {
    if (Helper.isValidatEmpty(req.body.status)) {
      return res.status(400).send({ message: 'Status is required', status: 400 });
    }
    next();
  },
  
  // This function checks if a present location is set properly.
  validatePresentLocation(req, res, next) {
    if (Helper.isValidatEmpty(req.body.presentLocation)) {
      return res.status(400).send({ message: 'Present Location is required', status: 400 });
    }
    next();
  },
  
  // This function checks if an email and password are both given.
  userValidator(req, res, next) {
    if (Helper.isValidatEmpty(req.body.email, req.body.password)) {
      return res.status(400).send({ message: 'Email and Password are required', status: 400 });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address', status: 400 });
    }
    next();
  },
  
  // This function checks if details of a parcel are set properly.
  parcelValidor(req, res, next) {
    // We're grabbing different details of a parcel from the request.
    const {
      location, destination, presentLocation, weight, receiverPhone,
    } = req.body;

    // We're checking if weight is a number and more than zero.
    if (typeof weight !== 'number' || weight <= 0) {
      return res.status(400).send({
        message: 'Weight must be a number and greater than zero', status: 400,
      });
    }

    // We're checking if other details are strings and have proper lengths.
    if (typeof location !== 'string' || typeof destination !== 'string'
    || typeof presentLocation !== 'string' || typeof receiverPhone !== 'string') {
      return res.status(400).send({
        message: 'location, destination, presentation location, phone must be strings', status: 400,
      });
    }

    // We're making sure the strings are long enough.
    if (location.length <= 3 || destination.length <= 3
    || presentLocation.length <= 3 || receiverPhone.length < 9) {
      return res.status(400).send({
        message: 'location, destination, presentation location must be greater than 3 digits and phone number greater than 9', status: 400,
      });
    }
    next(); // If everything's okay, we move on to the next thing.
  },
  
  // This function checks if something is empty.
  isValidatEmpty(input) {
    if (!input) {
      return true; // If it's empty, we say it's true.
    }
    return false; // If it's not empty, we say it's false.
  },
  
  // This function makes a special code for a user.
  generateToken(id) {
    // It's like making a special stamp with a user's ID that lasts for a certain time.
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '9d' });
    return token; // We give this stamp back to the user.
  },
};

export default Helper; // We're making this special helper available for other parts of our code to use.
