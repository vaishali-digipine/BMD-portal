import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';

export namespace BirthService {
  export type Id = string;

  export interface Base {
    _id: Id;
    birthName: String;
    birthDate: Date;
    birthTime: string;
    birthDistrict: string;
    birthPlace: String;
    birthGender: EGender;
    birthWeight: number;
    fatherAadharId: Aadhar.Id;
    motherAadharId: Aadhar.Id;
    fatherAadharCard: File;
    motherAadharCard: File;
    marriageCertificate: File;
    birthHospitalReprot: File;
    rationCard: File;
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
        birthName: String;
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

    export type CreateResponse = Response.Normal<Base>;
  }

  export enum EGender {
    male = 'male',
    female = 'female',
    other = 'other',
  }
}
