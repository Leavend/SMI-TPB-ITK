import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import Utility from '../utils/index.utils';
import { ResponseCode } from '../interfaces/enum/code-enum';

import RoleService from '../services/role-service';
import { IRoleCreationBody } from '../interfaces/role-interface';

import UserRoleService from '../services/user-role-service';
import { IUserRoleCreationBody } from '../interfaces/user-role-interface';

import UserService from '../services/user-service';

@autoInjectable()
class RoleController {
  private roleService: RoleService;
  private userRoleService: UserRoleService;
  private userService: UserService;

  constructor(
    _roleService: RoleService,
    _userRoleService: UserRoleService,
    _userService: UserService,
  ) {
    this.roleService = _roleService;
    this.userRoleService = _userRoleService;
    this.userService = _userService;
  }

  async createRole(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newRole = { roleName: params.roleName } as IRoleCreationBody;

      let roleExist = await this.roleService.getRoleByField({
        where: { roleName: newRole.roleName },
      });
      if (roleExist) {
        return Utility.handleError(res, 'Role name already exists', ResponseCode.ALREADY_EXIST);
      }

      let role = await this.roleService.createRole(newRole);
      return Utility.handleSuccess(
        res,
        'Role created successfully',
        { role },
        ResponseCode.CREATED,
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const roleName = params.roleName;
      const roleExist = await this.roleService.getRoleByField({ where: { roleName } });
      if (!roleExist) {
        return Utility.handleError(res, 'Role not found', ResponseCode.NOT_FOUND);
      }

      const rowsDeleted = await this.roleService.deleteRole({ where: { roleName } });

      if (rowsDeleted === 0) {
        return Utility.handleError(res, 'Role not found', ResponseCode.NOT_FOUND);
      }

      return Utility.handleSuccess(res, 'Role deleted successfully', {}, ResponseCode.OK);
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const query = { where: {}, raw: true };
      const roles = await this.roleService.getRoles(query);
      return Utility.handleSuccess(res, 'Roles retrieved successfully', { roles }, ResponseCode.OK);
    } catch (error) {
      return Utility.handleError(
        res,
        'An error occurred while retrieving roles',
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignUserRole(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const userRoleExist = await this.userRoleService.getUserRoleByField({
        where: { userId: params.userId, roleId: params.roleId },
      });

      if (userRoleExist) {
        return Utility.handleError(
          res,
          'Role already assigned to user',
          ResponseCode.ALREADY_EXIST,
        );
      }

      const newUserRole = { userId: params.userId, roleId: params.roleId } as IUserRoleCreationBody;
      const userRole = await this.userRoleService.assignRole(newUserRole);

      return Utility.handleSuccess(
        res,
        'Role assigned to user successfully',
        { userRole },
        ResponseCode.CREATED,
      );
    } catch (error) {
      console.error(error);
      return Utility.handleError(
        res,
        'An error occurred while assigning the user role',
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeUserRole(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const query = { where: { userId: params.userId, roleId: params.roleId } };

      let userRoleExist = await this.userRoleService.getUserRoleByField(query);
      if (!userRoleExist) {
        return Utility.handleError(res, 'Role not assigned to user', ResponseCode.ALREADY_EXIST);
      }

      await this.userRoleService.removeRole(query);
      return Utility.handleSuccess(res, 'Role removed from user successfully', {}, ResponseCode.OK);
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserRole(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newRoleId = params.newRoleId;
      const updateData = { roleId: newRoleId };
      const query = { where: { userId: params.userId, roleId: params.oldRoleId } };

      let userRoleExist = await this.userRoleService.getUserRoleByField(query);
      if (!userRoleExist) {
        return Utility.handleError(res, 'Role not assigned to user', ResponseCode.ALREADY_EXIST);
      }

      let roleNotFound = await this.roleService.getRoleByField({ where: { roleId: newRoleId } });
      if (!roleNotFound) {
        return Utility.handleError(res, 'Role not found', ResponseCode.NOT_FOUND);
      }

      let roleAlreadySame = await this.userRoleService.getUserRoleByField({
        where: { userId: params.userId, roleId: newRoleId },
      });
      if (roleAlreadySame) {
        return Utility.handleError(
          res,
          'Role already assigned to user',
          ResponseCode.ALREADY_EXIST,
        );
      }

      let updatedUserRole = await this.userRoleService.updateUserRole(query, updateData);
      return Utility.handleSuccess(
        res,
        'User role updated successfully',
        { updatedUserRole },
        ResponseCode.OK,
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserRoles(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const query = { where: { userId: params.userId } };

      let userExist = await this.userService.getUserByField({ userId: params.userId });
      if (!userExist) {
        return Utility.handleError(res, 'User not exist', ResponseCode.NOT_FOUND);
      }

      let userRoleExist = await this.userRoleService.getUserRoleByField(query);
      if (!userRoleExist) {
        return Utility.handleError(res, 'User have no Role', ResponseCode.ALREADY_EXIST);
      }

      let userRoles = await this.userRoleService.getUserRoles(query);
      return Utility.handleSuccess(
        res,
        'User roles retrieved successfully',
        { userRoles },
        ResponseCode.OK,
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default RoleController;
