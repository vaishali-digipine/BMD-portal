import { Aadhar } from '../aadhars/aadhars.type';
import { OfficeDepartment } from '../officeDepartments/officeDepartments.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { Role } from '../roles/roles.type';

export namespace User {
  export type Id = string;

  export interface Base {
    _id: Id;
    roleId: Role.Id;
    aadharId: Aadhar.Id;
    officeDepartmentId: string;
    employeeId: string;
    email: string;
    password: string;
    status: EStatus;
    lastLoginAt: Date;
    lastAssignedAt: Date;
    aadharcard: string;
    signature: string;
    govEmployeeIdCard: string;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'aadharId' | 'officeDepartmentId' | 'roleId'> & {
    aadharId: Aadhar.Base;
    officeDepartmentId: OfficeDepartment.Detail;
    roleId: Role.Base;
  };

  export namespace Apis {
    export interface CreatePayload {
      email: string;
      password: string;
    }

    export interface UpdatePayload {
      status: EStatus;
    }

    export type CreateResponse = Response.Normal<Detail>;
    export type ListResponse = Response.Paginated<Base>;
    export type UpdateResponse = Response.Normal<Detail>;
  }

  export enum EStatus {
    pending = 'pending',
    active = 'active',
    blocked = 'blocked',
  }
}
