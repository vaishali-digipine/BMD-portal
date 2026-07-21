import { OfficeDepartment } from '../officeDepartments/officeDepartments.type';
import { Slot } from '../slots/slots.type';
import { User } from '../users/users.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { BirthService } from '../birthService/birthServices.type';
import { MarriageService } from '../marriageService/marriageService.type';
import { DeathService } from '../deathService/deathService.type';

export namespace Application {
  export type Id = string;

  export interface Base {
    _id: Id;
    applicationNumber: string;
    userId: User.Id;
    clerkId: User.Id;
    officeDepartmentId: string;
    slotId: Slot.Id;
    serviceId: BirthService.Id | MarriageService.Id | DeathService.Id;
    serviceType: EServiceType;
    status: EApplicationStatus;
    remarks: string | null;

    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<
    Base,
    'userId' | 'clerkId' | 'officeDepartmentId' | 'slotId' | 'serviceId'
  > & {
    userId: User.Detail;
    clerkId: User.Detail;
    officeDepartmentId: OfficeDepartment.Detail;
    slotId: Slot.Detail;
    serviceId: BirthService.Detail | MarriageService.Detail | DeathService.Detail;
  };

  export namespace Apis {
    export interface Create {
      officeDepartmentId: string;
      slotId: string;
      serviceId: string;
      serviceType: EServiceType;
    }

    export type CreateResponse = Response.Normal<Detail>;

    export interface Update {
      status?: EApplicationStatus;
      remarks?: string;
    }

    export type UpdateResponse = Response.Normal<Detail>;

    export type GetResponse = Response.Normal<Detail>;

    export interface ListResponse {
      message: string;
      pagination: {
        page: number;
        limit: number;
        totalApplications: number;
        totalPages: number;
      };

      data: Detail[];
    }

    export type DeleteResponse = Response.Normal<null>;
  }
}

export enum EServiceType {
  birth = 'birth',
  marriage = 'marriage',
  death = 'death',
}

export enum EApplicationStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}
