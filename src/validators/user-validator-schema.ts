import * as yup from 'yup';

const registerSchema = yup.object({
  full_name: yup.string().trim().required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .lowercase()
    .trim()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(student|lecturer|staff)\.itk\.ac\.id$/,
      'Email must be a valid itk.ac.id domain email',
    ),
  password: yup.string().min(6).trim().required('Password is required'),
  major: yup.string().trim().required('Major is required'),
  study_program: yup.string().trim().required('Study program is required'),
});

const loginSchema = yup.object({
  username: yup.string().lowercase().trim().required('Username is required'),
  password: yup.string().min(6).trim().required('Password is required'),
});

const changePasswordSchema = yup.object({
  oldPassword: yup.string().min(6).trim().required('Old password is required'),
  newPassword: yup.string().min(6).trim().required('New password is required'),
});

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .lowercase()
    .trim()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@(student|lecturer|staff)\.itk\.ac\.id$/, 'Email not valid'),
});

const resetPasswordSchema = yup.object({
  code: yup.string().trim().required(),
  email: yup
    .string()
    .email('Invalid email format')
    .lowercase()
    .trim()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@(student|lecturer|staff)\.itk\.ac\.id$/, 'Email not valid'),
  password: yup.string().min(6).trim().required(),
});

const createRole = yup.object({
  roleName: yup.string().trim().required('Role name is required'),
});

const deleteRole = yup.object({
  roleName: yup.string().trim().required('Role name is required'),
});

const assignUserRole = yup.object({
  roleId: yup.string().trim().required('Role not Found'),
  userId: yup.string().trim().required('User not Found'),
});

const removeUserRole = yup.object({
  roleId: yup.string().trim().required('Role not Found'),
  userId: yup.string().trim().required('User not Found'),
});

const updateUserRole = yup.object({
  oldRoleId: yup.string().trim().required('Old Role not Found'),
  userId: yup.string().trim().required('User not Found'),
  newRoleId: yup.string().trim().required('New Role not Found'),
});

const getUserRoles = yup.object({
  userId: yup.string().trim().required('User not Found'),
});

const ValidationUserSchema = {
  register: registerSchema,
  login: loginSchema,
  changePassword: changePasswordSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  createRole: createRole,
  deleteRole: deleteRole,
  assignRole: assignUserRole,
  removeRole: removeUserRole,
  updateRole: updateUserRole,
  getRoles: getUserRoles,
};

export default ValidationUserSchema;
