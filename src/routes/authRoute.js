import express from 'express';
import UserControllers from '../controller/UserController';
import Helper from '../controller/HelperController';


const authRoute = express.Router();

authRoute.route('/signup')
  .post(Helper.userValidator, UserControllers.signup);

authRoute.route('/login')
  .post(Helper.userValidator, UserControllers.login);


export default authRoute;