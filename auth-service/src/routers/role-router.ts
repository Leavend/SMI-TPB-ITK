import express, { Request, Response } from 'express';
import { container } from 'tsyringe';

import RoleController from '../controllers/role-controller';
import ValidationUserSchema from '../validators/user-validator-schema';
import { validator, KoorPusAuth, AdminAuth } from '../middlewares/index.middleware';

const router = express.Router();

const roleController = container.resolve(RoleController);

const createRoleRouter = () => {
  router.post(
    '/create',
    KoorPusAuth(),
    validator(ValidationUserSchema.createRole),
    (req: Request, res: Response) => {
      return roleController.createRole(req, res);
    },
  );

  router.post(
    '/delete',
    KoorPusAuth(),
    validator(ValidationUserSchema.deleteRole),
    (req: Request, res: Response) => {
      return roleController.deleteRole(req, res);
    },
  );

  router.get('/get-all-roles', AdminAuth(), (req: Request, res: Response) => {
    return roleController.getAllRoles(req, res);
  });

  router.post(
    '/assign',
    AdminAuth(),
    validator(ValidationUserSchema.assignRole),
    (req: Request, res: Response) => {
      return roleController.assignUserRole(req, res);
    },
  );

  router.post(
    '/remove',
    AdminAuth(),
    validator(ValidationUserSchema.removeRole),
    (req: Request, res: Response) => {
      return roleController.removeUserRole(req, res);
    },
  );

  router.put(
    '/update',
    AdminAuth(),
    validator(ValidationUserSchema.updateRole),
    (req: Request, res: Response) => {
      return roleController.updateUserRole(req, res);
    },
  );

  router.get(
    '/get-all-user-roles',
    KoorPusAuth(),
    validator(ValidationUserSchema.getRoles),
    (req: Request, res: Response) => {
      return roleController.getUserRoles(req, res);
    },
  );

  return router;
};

export default createRoleRouter();
