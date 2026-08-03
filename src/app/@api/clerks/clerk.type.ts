import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';

export namespace Clerk {
  export type ID = string;

  export interface Base {
    _id: ID;
    aadharId: Aadhar.Id;
  }

  export type Detail = Omit<Base, 'aadharId'> & {
    aadharId: Aadhar.Base;
  };

  export namespace Apis {
    export interface CreatePayload {
      verificationToken: string;

      employeeId: string;

      stateId: string;

      districtId: string;

      officeId: string;

      departmentId: string;

      aadharCard: File;

      signature: File;

      govEmployeeIdCard: File;
    }
    export interface setPasswordPayload {
      setPasswordToken: string;
      password: string;
    }

    export type setPasswordResponse = Response.Normal<null>;
  }
}
