// Importing necessary libraries for handling dates, generating unique IDs, interacting with the database, and sending emails.
import moment from 'moment'; // Library for handling dates and times.
import uuidv4 from 'uuid/v4'; // Library for generating unique IDs.
import db from '../db'; // Database connection module.
import Parcel from '../model/parcel'; // Custom Parcel model definition.
import mailSender from '../middleware/MailSender'; // Middleware for sending emails.

// Define different statuses a parcel can have.
const parcelStatus = {
  PENDING: 'PENDING',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED: 'ARRIVED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

// SQL query for creating a new parcel in the database.
const createParcelQuery = `INSERT INTO
      parcels(id, location, destination ,present_location, weight, owner_id, receiver_phone, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;

// SQL query for finding a parcel by ID for a regular user.
const findOneQuery = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
// SQL query for finding a parcel by ID for an admin user.
const findOneQueryAdmin = 'SELECT * FROM parcels WHERE id = $1';
// SQL query for finding a parcel by ID for a regular user.
const findOneQueryUser = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';

// SQL query for updating the status of a parcel.
const updateStatuQuery = `UPDATE parcels
SET status=$1,modified_date=$2
WHERE id=$3 returning *`;

// SQL query for cancelling a parcel.
const cancelQuery = `UPDATE parcels
SET status=$1,modified_date=$2
WHERE id=$3 AND owner_id = $4 returning *`;

// SQL query for updating the present location of a parcel.
const updatePresentLocationQuery = `UPDATE parcels
SET present_location=$1,modified_date=$2
WHERE id=$3 returning *`;

// SQL query for updating the destination of a parcel.
const updateDestinationQuery = `UPDATE parcels
SET destination=$1,modified_date=$2
WHERE id=$3 AND owner_id = $4 returning *`;

// SQL query for getting user information from the database.
const getUserQuery = 'SELECT * FROM users WHERE id = $1';

// Define a Parcels object to encapsulate functions related to parcel management.
const Parcels = {
  // Function to create a new parcel.
  async create(req, res) {
    // Extract parcel information from the request body.
    const {
      location, destination, presentLocation, weight, receiverPhone,
    } = req.body;

    // Create a new Parcel object with the extracted information.
    const newParcel = new Parcel(uuidv4(), location, destination, presentLocation, weight,
      req.user.id, receiverPhone, parcelStatus.PENDING, moment(new Date()), moment(new Date()));

    try {
      // Execute the SQL query to insert the new parcel into the database.
      const { rowCount, rows } = await db.query(createParcelQuery, Object.values(newParcel));
      // Return a success response with the created parcel information.
      return res.status(201).send({
        message: 'Parcel Created Successfully', status: 201, rowCount, data: rows[0],
      });
    } catch (error) {
      // Return an error response if something went wrong during the creation of the parcel.
      return res.status(400).send({ message: error, status: 400 });
    }
  },
  // Function to fetch all parcel delivery orders from the database.
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Function to fetch all parcel delivery orders by a specific user from the database.
  async parcelByUser(req, res) {
    const parcelByUserQuery = 'SELECT * FROM parcels WHERE owner_id = $1';

    try {
      const { rows, rowCount } = await db.query(parcelByUserQuery, [req.user.id]);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Function to fetch a specific parcel delivery order from the database.
  async getOne(req, res) {
    try {
      const { rows, rowCount } = await db.query(findOneQuery, [req.params.parcelId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'parcels not found', status: 400 });
      }
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      if (error.routine === 'string_to_uuid') {
        return res.status(200).send({
          message: 'Invalid Id', status: 400,
        });
      }
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Function to fetch a specific parcel delivery order for an admin user from the database.
  async getOneAdmin(req, res) {
    try {
      const { rows, rowCount } = await db.query(findOneQueryAdmin, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'parcels not found', status: 400 });
      }
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      if (error.routine === 'string_to_uuid') {
        return res.status(200).send({
          message: 'Invalid Id', status: 400,
        });
      }
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Function to cancel a specific parcel delivery order in the database.
  async cancel(req, res) {
    try {
      const { rows } = await db.query(findOneQueryUser, [req.params.parcelId, req.user.id]);
      if (rows[0]) {
        if (rows[0].status === parcelStatus.ARRIVED
          || rows[0].status === parcelStatus.DELIVERED
          || rows[0].status === parcelStatus.CANCELLED) {
          return res.status(400).send({ message: 'Ooops, The parcel has been delived or
