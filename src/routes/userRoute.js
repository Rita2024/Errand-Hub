import express from 'express';
import ParcelController from '../controller/ParcelController';
import UserControllers from '../controller/UserController';
import Helper from '../controller/HelperController';
import Auth from '../middleware/Authentication';


const userRoute = express.Router();

userRoute.route('/')
  .get(UserControllers.allUsers);

userRoute.route('/delete')
  .delete(UserControllers.delete);

userRoute.route('/:userId')
  .get(UserControllers.userById);

userRoute.route('/:userId/parcels')
  .get(ParcelController.parcelByUser);

userRoute.route('/:userId/update')
  .put(Auth.secureRoute, Helper.validateUserRole,
    UserControllers.updateUser);

export default userRoute;