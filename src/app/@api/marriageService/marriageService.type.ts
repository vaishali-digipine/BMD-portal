import { Aadhar } from '../aadhars/aadhars.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';

export namespace MarriageService {
  export type Id = string;

  export interface Base {
    _id: Id;
    brideAadharId: Aadhar.Id;
    brideFatherName: string;
    brideMotherName: string;
    groomAadharId: Aadhar.Id;
    groomFatherName: string;
    groomMotherName: string;
    witnessAadharId: Aadhar.Id;
    witnessRelation: string;
    brahmanAadharId: Aadhar.Id;
    marriageDate: Date;
    marriageDistrict: District.Id;
    marriagePlace: string;
    brideAadharCard: string;
    groomAadharCard: string;
    witnessAadharCard: string;
    brahmanAadharCard: string;
    brideRationCard: string;
    groomRationCard: string;
    bridePhoto: string;
    groomPhoto: string;
    invitationCard: string;
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
    export interface UpdatePayload {
      brideFatherName?: String;
      brideMotherName?: string;
      groomFatherName?: string;
      groomMotherName?: String;
      marriagePlace?: String;
      marriageDate?: Date;
      districId?: string;
      witnessRelation?: string;
    }

    export interface CreateResponse {
      message: string;
      data: {
        marriage: Base;
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
}
