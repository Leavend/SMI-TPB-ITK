import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { container } from 'tsyringe';
import dotenv from 'dotenv';

import Utility from '../utils/index.utils';
import { ResponseCode } from '../interfaces/enum/code-enum';
import { AccountStatus } from '../interfaces/enum/user-enum';

import UserService from '../services/user-service';
import { IUser } from '../interfaces/user-interface';

import UserRoleService from '../services/user-role-service';

import RoleService from '../services/role-service';
import { IUserRole } from '../interfaces/user-role-interface';
import { IFindRoleQuery } from '../interfaces/role-interface';

// import { userCache } from '../services/consume-message-service';

const userService = container.resolve(UserService);
const userRoleService = container.resolve(UserRoleService);
const roleService = container.resolve(RoleService);

const envFile =
  process.env.NODE_ENV === 'local'
    ? '.env.local'
    : process.env.NODE_ENV === 'development'
    ? '.env.dev'
    : '.env.local';
dotenv.config({ path: envFile });

export const validator = (schema: Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      return Utility.handleError(res, error.errors[0], ResponseCode.BAD_REQUEST);
    }
  };
};

export const Auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? '';
      if (Utility.isEmpty(token)) {
        throw new Error('Authorization failed: No token provided');
      }
      token = token.split(' ')[1];
      if (!token) {
        throw new Error('Authorization failed: Malformed token');
      }

      let decoded: IUser & JwtPayload;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser & JwtPayload;
      } catch (error) {
        throw new Error('Authorization failed: Invalid token');
      }

      if (decoded && decoded.userId) {
        const user = await userService.getUserByField({ userId: decoded.userId });
        if (!user) {
          throw new Error('Authorization failed: User not found');
        }

        const userRoles: IUserRole[] = await userRoleService.getRolesByUserId(decoded.userId);
        if (!userRoles || userRoles.length === 0) {
          throw new Error('Authorization failed: No roles found for user');
        }

        const roleNames = await Promise.all(
          userRoles.map(async (userRole: IUserRole) => {
            const role = await roleService.getRoleByField({ where: { roleId: userRole.roleId } });
            return role?.roleName;
          }),
        );

        if (user.accountStatus === AccountStatus.DELETED) {
          throw new Error('Authorization failed: Account does not exist');
        }

        if (user.accountStatus === AccountStatus.SUSPENDED) {
          throw new Error('Authorization failed: Account suspended');
        }

        if (user.accountStatus === AccountStatus.FROZEN) {
          throw new Error('Authorization failed: Account frozen');
        }

        req.body.user = { ...decoded, roleNames };
        next();
      } else {
        throw new Error('Authorization failed: Invalid user data');
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Utility.handleError(res, (error as Error).message, ResponseCode.BAD_REQUEST);
    }
  };
};

export const AdminAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? '';
      if (Utility.isEmpty(token)) {
        throw new Error('Authorization failed: No token provided');
      }
      token = token.split(' ')[1];
      if (!token) {
        throw new Error('Authorization failed: Malformed token');
      }

      let decoded: IUser & JwtPayload;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser & JwtPayload;
      } catch (error) {
        throw new Error('Authorization failed: Invalid token');
      }

      if (decoded && decoded.userId) {
        const user = await userService.getUserByField({ userId: decoded.userId });
        if (!user) {
          throw new Error('Authorization failed: User not found');
        }

        const userRoles: IUserRole[] = await userRoleService.getRolesByUserId(decoded.userId);
        if (!userRoles || userRoles.length === 0) {
          throw new Error('Authorization failed: No roles found for user');
        }

        const roleNames = await Promise.all(
          userRoles.map(async (userRole: IUserRole) => {
            const role = await roleService.getRoleByField({ where: { roleId: userRole.roleId } });
            return role?.roleName;
          }),
        );

        if (
          !roleNames.includes('Koordinator Pusat TPB') &&
          !roleNames.includes('Tendik Akademik TPB')
        ) {
          throw new TypeError('Authorization failed: Insufficient permissions');
        }

        if (user.accountStatus == AccountStatus.DELETED) {
          throw new Error('Authorization failed: Account does not exist');
        }

        if (user.accountStatus == AccountStatus.SUSPENDED) {
          throw new Error('Authorization failed: Account suspended');
        }

        if (user.accountStatus == AccountStatus.FROZEN) {
          throw new Error('Authorization failed: Account frozen');
        }

        req.body.user = { ...decoded, roleNames };
        next();
      } else {
        throw new Error('Authorization failed: Invalid user data');
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Utility.handleError(res, (error as Error).message, ResponseCode.BAD_REQUEST);
    }
  };
};

export const KoorPusAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? '';
      if (Utility.isEmpty(token)) {
        throw new Error('Authorization failed: No token provided');
      }
      token = token.split(' ')[1];
      if (!token) {
        throw new Error('Authorization failed: Malformed token');
      }

      let decoded: IUser & JwtPayload;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser & JwtPayload;
      } catch (error) {
        throw new Error('Authorization failed: Invalid token');
      }

      if (decoded && decoded.userId) {
        const user = await userService.getUserByField({ userId: decoded.userId });
        if (!user) {
          throw new Error('Authorization failed: User not found');
        }

        const userRoles: IUserRole[] = await userRoleService.getRolesByUserId(decoded.userId);
        if (!userRoles || userRoles.length === 0) {
          throw new Error('Authorization failed: No roles found for user');
        }

        const roleNames = await Promise.all(
          userRoles.map(async (userRole: IUserRole) => {
            const role = await roleService.getRoleByField({ where: { roleId: userRole.roleId } });
            return role?.roleName;
          }),
        );

        if (!roleNames.includes('Koordinator Pusat TPB')) {
          throw new TypeError('Authorization failed: Insufficient permissions');
        }

        if (user.accountStatus == AccountStatus.DELETED) {
          throw new Error('Authorization failed: Account does not exist');
        }

        if (user.accountStatus == AccountStatus.SUSPENDED) {
          throw new Error('Authorization failed: Account suspended');
        }

        if (user.accountStatus == AccountStatus.FROZEN) {
          throw new Error('Authorization failed: Account frozen');
        }

        req.body.user = { ...decoded, roleNames };
        next();
      } else {
        throw new Error('Authorization failed: Invalid user data');
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Utility.handleError(res, (error as Error).message, ResponseCode.BAD_REQUEST);
    }
  };
};
