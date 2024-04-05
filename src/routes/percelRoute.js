import express from 'express'; // Importing the 'express' framework

import Auth from '../middleware/Authentication'; // Importing the authentication middleware
import ParcelController from '../controller/ParcelController'; // Importing the parcel controller
import Helper from '../controller/HelperController'; // Importing the helper controller

const parcelRoute = express.Router(); // Creating an instance of Express Router

parcelRoute.route('/')
  .get(Auth.secureRoute, ParcelController.getAll) // Defining a GET route for retrieving all parcels, requiring authentication using secureRoute middleware from Authentication and invoking getAll function from ParcelController
  .post(Helper.parcelValidor, ParcelController.create); // Defining a POST route for creating a new parcel, validating parcel data using parcelValidator middleware from HelperController and invoking create function from ParcelController

parcelRoute.route('/:parcelId')
  .get(ParcelController.getOne); // Defining a GET route for retrieving a single parcel by ID and invoking getOne function from ParcelController

parcelRoute.route('/:parcelId/admin')
  .get(Auth.secureRoute, ParcelController.getOneAdmin); // Defining a GET route for retrieving a single parcel by ID for admin purposes, requiring authentication using secureRoute middleware from Authentication and invoking getOneAdmin function from ParcelController

parcelRoute.route('/:parcelId/cancel')
  .put(ParcelController.cancel); // Defining a PUT route for canceling a parcel by ID and invoking cancel function from ParcelController

parcelRoute.route('/:parcelId/destination')
  .put(ParcelController.changeDestination); // Defining a PUT route for changing the destination of a parcel by ID and invoking changeDestination function from ParcelController

parcelRoute.route('/:parcelId/presentLocation')
  .put(Helper.validatePresentLocation, Auth.secureRoute,
    ParcelController.ChangePresentLocation); // Defining a PUT route for changing the present location of a parcel by ID, validating present location using validatePresentLocation middleware from HelperController, requiring authentication using secureRoute middleware from Authentication, and invoking ChangePresentLocation function from ParcelController

parcelRoute.route('/:parcelId/status')
  .put(Helper.validateStatus, Auth.secureRoute,
    ParcelController.changeStatus); // Defining a PUT route for changing the status of a parcel by ID, validating status using validateStatus middleware from HelperController, requiring authentication using secureRoute middleware from Authentication, and invoking changeStatus function from ParcelController

export default parcelRoute; // Exporting the parcel routes