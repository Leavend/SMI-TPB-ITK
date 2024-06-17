import express, { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import UserController from '../controllers/user-controller';
import ValidationUserSchema from '../validators/user-validator-schema';
import { validator, Auth, KoorPusAuth } from '../middlewares/index.middleware';

const router = express.Router();

const UserControllers = container.resolve(UserController);

const createUserRoute = () => {
  router.post(
    '/register',
    validator(ValidationUserSchema.register),
    (req: Request, res: Response) => {
      return UserControllers.registerUser(req, res);
    },
  );

  router.post('/login', validator(ValidationUserSchema.login), (req: Request, res: Response) => {
    return UserControllers.loginUser(req, res);
  });

  router.get('/current-user', Auth(), (req: Request, res: Response) => {
    return UserControllers.currentUser(req, res);
  });

  router.get('/get-all-users', KoorPusAuth(), (req: Request, res: Response) => {
    return UserControllers.getAllUsers(req, res);
  });

  router.post(
    '/change-password',
    Auth(),
    validator(ValidationUserSchema.changePassword),
    (req: Request, res: Response) => {
      return UserControllers.changePassword(req, res);
    },
  );

  router.post(
    '/forgot-password',
    validator(ValidationUserSchema.forgotPassword),
    (req: Request, res: Response) => {
      return UserControllers.forgotPassword(req, res);
    },
  );

  router.post(
    '/reset-password',
    validator(ValidationUserSchema.resetPassword),
    (req: Request, res: Response) => {
      return UserControllers.resetPassword(req, res);
    },
  );

  return router;
};

export default createUserRoute();
