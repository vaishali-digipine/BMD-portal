import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';

export namespace MarriageService {
  export type Id = string;

  export interface Base {
    _id: Id;
    brideAadharId: Aadhar.Id;
    brideFatherName: String;
    brideMotherName: string;
    groomAadharId: Aadhar.Id;
    groomFatherName: string;
    groomMotherName: String;
    witnessAadharId: Aadhar.Id;
    witnessRelation: string;
    brahmanAadharId: Aadhar.Id;
    marriageDate: Date;
    marriageDistrict: string;
    marriagePlace: String;
    brideAadharcard: File;
    groomAadharCard: File;
    witnessAadharCard: File;
    brahmanAadharCard: File;
    brideRationCard: File;
    groomRationCard: File;
    bridePhoto: File;
    groomPhoto: File;
    invitationCard: File;
    createdId: string;
    updatedId: string;
  }

  export type Detail = Omit<
    Base,
    'brideAadharId' | 'groomAadharId' | 'witnessAadharId' | 'brahmanAadharId' | 'marriageDistrict'
  > & {
    brideAadharId: Aadhar.Base;
    groomAadharId: Aadhar.Base;
    witnessAadharId: Aadhar.Base;
    brahmanAadharId: Aadhar.Base;
    marriageDistrict: District.Base;
  };

  export namespace Apis {
    export interface CreatePayload {
      data: {
        brideAadharId: string;
        brideFatherName: String;
        brideMotherName: string;
        groomAadharId: string;
        groomFatherName: string;
        groomMotherName: String;
        witnessAadharId: String;
        witnessRelation: string;
        brahmanAadharId: string;
        marriageDate: Date;
        districId: string;
        marriagePlace: String;
        brideAadharcard: File;
        groomAadharCard: File;
        witnessAadharCard: File;
        brahmanAadharCard: File;
        brideRationCard: File;
        groomRationCard: File;
        bridePhoto: File;
        groomPhoto: File;
        invitationCard: File;
      };
    }

    export type CreateResponse = Response.Normal<Base>;
  }
}
