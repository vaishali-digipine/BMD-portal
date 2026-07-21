import { Response } from '../../@common/types/ApiLayer.types';
import { Aadhar } from '../aadhars/aadhars.type';
import { Department } from '../departments/departments.type';
import { District } from '../districts/districts.type';
import { OfficeDepartment } from '../officeDepartments/officeDepartments.type';
import { Office } from '../offices/offices.type';
import { Role } from '../roles/roles.type';
import { State } from '../states/states.type';
import { User } from '../users/users.type';

export namespace Auth {
  export type Id = string;

  export interface Base {}

  export type Detail = Base;

  export type List = Detail[];

  export namespace Apis {
    export interface RequestOtpPayload {
      aadharNumber: string;
    }

    export type RequestOtpResponse = {
      message: string;
    };

    export interface VerifyOtpPayload {
      aadharNumber: string;
      otpNumber: string | null;
    }

    export type VerifyOtpResponse = {
      verificationToken: string;

      data: Aadhar.Detail;
    };

    export interface AadharDetailPaylod {
      aadharNumber: string;
    }

    export type AadharDetailResponse = {
      data: Aadhar.Detail;
    };

    export interface UserList {
      _id: string;

      email: string;

      roleId: string;

      aadharId: {
        _id: string;
        firstName: string;
        middleName: string | null;
        lastName: string;
        contact: string;
        aadharNumber: string;
      };

      createdAt: string;

      updatedAt: string;
    }

    export type UserListResponse = Response.Paginated<UserList>;

    export interface RegisterPayload {
      verificationToken: string;
      password: string;
    }

    export type RegisterResponse = {
      user: {
        _id: string;
        email: string;
        role: string;
      };
      accessToken: string;
      refreshToken: string;
    };

    export interface ClerkRegisterPayload {
      verificationToken: string;

      employeeId: string;
      officeDepartmentId: string;

      aadharCard: File;
      signature: File;
      govEmployeeIdCard: File;
    }

    export interface ClerkRegisterResponse {
      message: string;
      setPasswordToken: string;

      data: {
        _id: string;
        roleId: string;
        aadharId: string;
        officeDepartmentId: string;
        employeeId: string;
        email: string;
        password: null;
        status: string;
        lastLoginAt: Date | null;
        lastAssignedAt: Date | null;

        aadharCard: string;
        signature: string;
        govEmployeeIdCard: string;

        refreshToken: string | null;

        createdAt: string;
        updatedAt: string;
      };
    }

    export interface ClerkList {
      _id: string;

      employeeId: string;

      email: string;

      status: string;

      roleId: string;

      aadharId: string;

      officeDepartmentId: string;

      lastLoginAt: string | null;

      lastAssignedAt: string | null;

      aadharCard: string;

      signature: string;

      govEmployeeIdCard: string;

      refreshToken: string | null;

      createdAt: string;

      updatedAt: string;
    }

    export type ClerkListResponse = Response.Paginated<ClerkList>;

    export interface LoginPayload {
      email: string;

      password: string;
    }

    export type LoginResponse = {
      accessToken: string;
      refreshToken: string;
      user: {
        _id: string;
        email: string;
        role: string;
      };
    };

    export interface Profile {
      _id: string;
      email: string;
      employeeId: string | null;
      status: string;
      lastLoginAt: string | null;

      roleId: {
        _id: string;
        name: string;
        slug: string;
      };

      aadharId: {
        _id: string;
        firstName: string;
        middleName?: string | null;
        lastName: string;
        email: string;
        contact: string;
        dob: string;
        gender: string;
        photo: string;
        aadharNumber: string;
        address: {
          street: string;
          city: string;
          taluka: string;
          district: string;
          state: string;
          pinCode: string;
        };
      };
      officeDepartmentId: {
        _id: string;
        officeId: {
          _id: Office.Id;
          name: string;
          districtId: {
            _id: District.Id;
            name: string;
            stateId: {
              _id: State.Id;
              name: string;
            };
          };
        };
        departmentId: {
          _id: Department.Id;
          name: string;
        };
      };
    }

    export type ProfileResponse = Profile;

    export type LogoutResponse = Response.Normal<null>;

    export interface ForgotPasswordPayload {
      email: string;
    }

    export type ForgotPasswordResponse = Response.Normal<null>;

    export interface VerifyForgotPasswordPayload {
      email: string;
      otpNumber: string | null;
    }

    export type VerifyForgotPasswordResponse = {
      message: string;
      verificationToken: string;
    };

    export interface ResetPasswordPayload {
      verificationToken: string;
      password: string;
    }

    export type ResetPasswordResponse = Response.Normal<null>;
  }
}
