import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
import { autoInjectable } from 'tsyringe';

import Utility from '../utils/index.utils';
import { AccountStatus } from '../interfaces/enum/user-enum';
import { ResponseCode } from '../interfaces/enum/code-enum';
import Permissions from '../permissions';

import UserService from '../services/user-service';
import { IUserCreationBody } from '../interfaces/user-interface';

import MahasiswaService from '../services/mahasiswa-service';
import { IMahasiswaCreationBody } from '../interfaces/mahasiswa-interface';

import DosenService from '../services/dosen-service';
import { IDosenCreationBody } from '../interfaces/dosen-interface';

import TendikService from '../services/tendik-service';
import { ITendikCreationBody } from '../interfaces/tendik-interface';

import RoleService from '../services/role-service';
import { IRoleCreationBody } from '../interfaces/role-interface';

import UserRoleService from '../services/user-role-service';
import { IUserRole, IUserRoleCreationBody } from '../interfaces/user-role-interface';

import TokenService from '../services/token-service';
import { IToken } from '../interfaces/token-interface';

import EmailService from '../services/email-service';

import { sendMessage } from '../services/message-service';

@autoInjectable()
class UserController {
  private userService: UserService;
  private mahasiswaService: MahasiswaService;
  private dosenService: DosenService;
  private tendikService: TendikService;
  private roleService: RoleService;
  private userRoleService: UserRoleService;
  private tokenService: TokenService;

  constructor(
    _userService: UserService,
    _mahasiswaService: MahasiswaService,
    _dosenService: DosenService,
    _tendikService: TendikService,
    _roleService: RoleService,
    _userRoleService: UserRoleService,
    _tokenService: TokenService,
  ) {
    this.userService = _userService;
    this.mahasiswaService = _mahasiswaService;
    this.dosenService = _dosenService;
    this.tendikService = _tendikService;
    this.roleService = _roleService;
    this.userRoleService = _userRoleService;
    this.tokenService = _tokenService;
  }

  async registerUser(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newUser = {
        full_name: params.full_name,
        email: params.email,
        accountStatus: AccountStatus.ACTIVE,
        password: params.password,
        major: params.major,
        study_program: params.study_program,
      } as IUserCreationBody;

      newUser.password = bcrypt.hashSync(newUser.password, 10);

      const userExist = await this.userService.getUserByField({ email: newUser.email });
      if (userExist) {
        return Utility.handleError(res, 'Email user already exist', ResponseCode.ALREADY_EXIST);
      }

      let username;
      if (newUser.email.endsWith('@student.itk.ac.id')) {
        username = newUser.email.split('@')[0];
      } else if (
        newUser.email.endsWith('@lecturer.itk.ac.id') ||
        newUser.email.endsWith('@staff.itk.ac.id')
      ) {
        const nameParts = newUser.full_name.split(' ');
        username = `${nameParts[0]}_${nameParts[nameParts.length - 1]}`.toLowerCase();
      } else {
        username = newUser.email.split('@')[0];
      }
      newUser.username = username;

      const user = await this.userService.createUser(newUser);
      user.password = '';

      let roleName = '';
      if (user.email.endsWith('@student.itk.ac.id')) {
        const newMahasiswa = {
          userId: user.userId,
          nim: user.username,
        } as IMahasiswaCreationBody;

        await this.mahasiswaService.createMahasiswa(newMahasiswa);
        roleName = 'Mahasiswa';
      } else if (user.email.endsWith('@lecturer.itk.ac.id')) {
        const newDosen = {
          userId: user.userId,
          nip: user.username,
        } as IDosenCreationBody;

        await this.dosenService.createDosen(newDosen);
        roleName = 'Dosen';
      } else if (user.email.endsWith('@staff.itk.ac.id')) {
        const newTendik = {
          userId: user.userId,
          nidn: user.username,
        } as ITendikCreationBody;

        await this.tendikService.createTendik(newTendik);
        roleName = 'Tendik Akademik Jurusan';
      } else {
        roleName = 'Umum';
      }

      let role = await this.roleService.getRoleByField({ where: { roleName } });
      if (!role) {
        const newRoleData = { roleName } as IRoleCreationBody;
        role = await this.roleService.createRole(newRoleData);
      }

      const newUserRole = { userId: user.userId, roleId: role.roleId } as IUserRoleCreationBody;
      await this.userRoleService.assignRole(newUserRole);

      return Utility.handleSuccess(
        res,
        'User registered successfully',
        { user, roleName },
        ResponseCode.CREATED,
      );
    } catch (error) {
      console.error('Error during user registration:', error);
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const envFile =
        process.env.NODE_ENV === 'local'
          ? '.env.local'
          : process.env.NODE_ENV === 'development'
          ? '.env.dev'
          : '.env.local';
      dotenv.config({ path: envFile });

      const params = { ...req.body };
      let user = await this.userService.getUserByField({ username: params.username });
      if (!user) {
        return Utility.handleError(res, 'Username doesnt Exist', ResponseCode.NOT_FOUND);
      }

      let isPasswordMatch = bcrypt.compareSync(params.password, user.password);

      if (!isPasswordMatch) {
        return Utility.handleError(res, 'Password is incorrect', ResponseCode.NOT_FOUND);
      }

      const userRoles: IUserRole[] = await this.userRoleService.getRolesByUserId(user.userId);

      const roleNames = await Promise.all(
        userRoles.map(async (userRole: IUserRole) => {
          const role = await this.roleService.getRoleByField({
            where: { roleId: userRole.roleId },
          });
          return role?.roleName;
        }),
      );

      const token_jwt = JWT.sign(
        {
          userId: user.userId,
          username: user.username,
          email: user.email,
          accountStatus: user.accountStatus,
          roleName: roleNames,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1h',
        },
      );

      user.password = '';

      const messages = { event: 'user_login', user, roleNames, token_jwt };

      await sendMessage(messages);

      return Utility.handleSuccess(
        res,
        'User logged in successfully',
        { user, roleNames, token_jwt },
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

  async currentUser(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ userId: params.user.userId });
      if (!user) {
        return Utility.handleError(res, 'User not found', ResponseCode.NOT_FOUND);
      }
      user.password = '';

      const roleNames: string[] = req.body.user.roleNames;

      return Utility.handleSuccess(
        res,
        'User fetched successfully',
        { user, roleNames },
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

  async getAllUsers(req: Request, res: Response) {
    try {
      const roleNames: string[] = req.body.user.roleNames;

      if (!roleNames.includes('Koordinator Pusat TPB')) {
        return Utility.handleError(
          res,
          'Authorization failed: Insufficient permissions',
          ResponseCode.FORBIDDEN,
        );
      }

      const mappedRoleNames = roleNames.map((role: string) => role.replace(/\s+/g, '_'));

      const permissions = Permissions.can(mappedRoleNames).readAny('users');
      if (!permissions.granted) {
        return Utility.handleError(res, 'Invalid Permission', ResponseCode.NOT_FOUND);
      }

      const query = { where: {}, raw: true };
      const users = await this.userService.getUsers(query);

      const usersHandleData = users.map((user: any) => {
        return { ...user, password: '' };
      });

      return Utility.handleSuccess(
        res,
        'Users fetched successfully',
        { users: usersHandleData },
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

  async changePassword(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ userId: params.user.userId });
      if (!user) {
        return Utility.handleError(res, 'User not found', ResponseCode.NOT_FOUND);
      }

      const oldPassword = params.oldPassword;
      const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);
      if (!isPasswordMatch) {
        return Utility.handleError(res, 'Old password is incorrect', ResponseCode.BAD_REQUEST);
      }

      const newPassword = params.newPassword;
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      await this.userService.updateRecord({ userId: user.userId }, { password: hashedNewPassword });

      return Utility.handleSuccess(res, 'Password changed successfully', {}, ResponseCode.OK);
    } catch (error) {
      console.error('Error during password change:', error);
      return Utility.handleError(res, (error as Error).message, ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ email: params.email });
      if (!user) {
        return Utility.handleError(res, 'Account does not exist', ResponseCode.NOT_FOUND);
      }

      const token = (await this.tokenService.createForgotPasswordToken(params.email)) as IToken;
      await EmailService.sendForgotPasswordMail(params.email, token.code);
      return Utility.handleSuccess(
        res,
        'Password reset code has been sent to your mail ',
        {},
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

  async resetPassword(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let isValidToken = await this.tokenService.getTokenByField({
        key: params.email,
        code: params.code,
        type: this.tokenService.TokenTypes.FORGOT_PASSWORD,
        status: this.tokenService.TokenStatus.NOTUSED,
      });
      if (!isValidToken) {
        return Utility.handleError(res, 'Token has expired', ResponseCode.NOT_FOUND);
      }

      if (isValidToken && moment(isValidToken.expires).diff(moment(), 'minute') <= 0) {
        return Utility.handleError(res, 'Token has expired', ResponseCode.NOT_FOUND);
      }

      let user = await this.userService.getUserByField({ email: params.email });
      if (!user) {
        return Utility.handleError(res, 'Invalid User Record', ResponseCode.NOT_FOUND);
      }

      const _password = bcrypt.hashSync(params.password, 10);

      await this.userService.updateRecord({ userId: user.userId }, { password: _password });
      await this.tokenService.updateRecord(
        { tokenId: isValidToken.tokenId },
        { status: this.tokenService.TokenStatus.USED },
      );

      return Utility.handleSuccess(res, 'Password reset successful ', {}, ResponseCode.OK);
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default UserController;
