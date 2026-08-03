import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';

export namespace DeathService {
  export type Id = string;

  export interface Base {
    _id: Id;
    deceasedAadharId: Aadhar.Id;

    deathPlace: string;
    deathDate: Date;
    deathTime: string;
    deathDistrict: District.Id;
    deceasedFatherName: string;
    deceasedMotherName: string;
    deathType: EDeathType;
    spouseAadharId: Aadhar.Id;
    deceasedAadharCard: string;
    spouseAadharCard: string;
    deceasedRationCard: string;
    deceasedPhoto: string;
    deceasedMedicalCertificate: string;
    pmReport: string | null;
    fir: string | null;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'deceasedAadharId' | 'spouseAadharId' | 'deathDistrict'> & {
    deceasedAadharId: Aadhar.Base;
    spouseAadharId: Aadhar.Base;
    deathDistrict: District.Base;
  };

  export namespace Apis {
    export interface Create {
      data: {
        deceasedAadharId: Aadhar.Id;
        deathDistrict: string;
        deathPlace: String;
        deathDate: Date;
        deathTime: string;
        deceasedFatherName: string;
        deceasedMotherName: string;
        deathType: EDeathType;
        spouseAadharId: Aadhar.Id;
        deceasedAadharCard: File;
        spouseAadharCard: File;
        deceasedRationCard: File;
        deceasedPhoto: File;
        deceasedMedicalCertificate: File;
        pmReport: File;
        fir: File;
      };
    }
    export interface Update {
      deathPlace?: string;
      deathDate?: Date;
      deathTime?: string;
      deceasedMotherName?: string;
      deceasedFatherName?: string;
      deathDistrict?: string;
    }

    export interface CreateResponse {
      message: string;
      data: {
        death: Base;
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

    export type GetByIdResponse = Response.Normal<Detail>;
    export type UpdateResponse = Response.Normal<Base>;
  }

  export enum EDeathType {
    'natural' = 'natural',
    'unnatural' = 'unnatural',
  }
}
