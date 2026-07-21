import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';

export namespace DeathService {
  export type Id = string;

  export interface Base {
    _id: Id;
    deceasedAadharId: string;
    districtId: string;
    deathPlace: String;
    deathDate: Date;
    deathTime: string;
    deathdistrict: string;
    deceasedFatherName: string;
    deceasedMotherName: string;
    deathType: EDeathType;
    spouseAadharId: string;
    deceasedAadharCard: File;
    spouseAadharCard: File;
    deceasedRationCard: File;
    deceasedPhoto: File;
    deceasedMedicalCertificate: File;
    pmReport: File | null;
    fir: File | null;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'deceasedAadharId' | 'spouseAadharId' | 'deathDistrict'> & {
    deceasedAadharId: Aadhar.Base;
    spouseAadharId: Aadhar.Base;
    deathDistrict: Aadhar.Base;
  };

  export namespace Apis {
    export interface Create {
      data: {
        deceasedAadharId: Aadhar.Id;
        districtId: string;
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

    export type CreateResponse = Response.Normal<Base>;
  }

  export enum EDeathType {
    'natural' = 'natural',
    'unnatural' = 'unnatural',
  }
}
