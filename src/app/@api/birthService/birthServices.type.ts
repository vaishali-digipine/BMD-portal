import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';

export namespace BirthService {
  export type Id = string;

  export interface Base {
    _id: Id;
    birthName: string;
    birthDate: Date;
    birthTime: string;
    birthDistrict: District.Id;
    birthPlace: string;
    birthGender: EGender;
    birthWeight: number;
    fatherAadharId: Aadhar.Id;
    motherAadharId: Aadhar.Id;
    fatherAadharCard: string;
    motherAadharCard: string;
    marriageCertificate: string;
    birthHospitalReport: string;
    rationCard: string;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'fatherAadharId' | 'motherAadharId' | 'birthDistrict'> & {
    fatherAadharId: Aadhar.Base;
    motherAadharId: Aadhar.Base;
    birthDistrict: District.Base;
  };

  export namespace Apis {
    export interface CreatePayload {
      data: {
        birthName: string;
        birthDate: Date;
        birthTime: string;
        birthDistrict: string;
        birthPlace: String;
        birthGender: EGender;
        birthWeight: number;
        fatherAadharId: string;
        motherAadharId: string;
        fatherAadharCard: File;
        motherAadharCard: File;
        marriageCertificate: File;
        birthHospitalReprot: File;
        rationCard: File;
      };
    }
    export interface UpdatePayload {
      birthName?: string;
      birthDate?: Date;
      birthTime?: string;
      birthDistrict?: string;
      birthPlace?: string;
      birthWeight?: number;
    }

    export interface CreateResponse {
      message: string;
      data: {
        birth: Base;
        application: {
          _id: string;
          applicationNumber: string;
          userId: string;
          clerkId: string | null;
          officeDepartmentId: string | null;
          slotId: string | null;
          serviceId: string;
          serviceType: string;
          status: string;
          remarks: string | null;
          createdAt: string;
          updatedAt: string;
        };
      };
    }

    export type UpdateResponse = Response.Normal<Base>;
    export type GetByIdResponse = Response.Normal<Detail>;
  }
}

export enum EGender {
  male = 'male',
  female = 'female',
  other = 'other',
}
