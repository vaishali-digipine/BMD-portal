import { OfficeDepartment } from '../officeDepartments/officeDepartments.type';

export namespace Slot {
  export type Id = string;

  export interface Base {
    _id: Id;
    officeDepartmentId: string;
    slotDate: Date;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    bookedCount: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'officeDepartmentId'> & {
    officeDepartmentId: OfficeDepartment.Detail;
  };

  export namespace Apis {
    export interface DateResponse {
      message: string;

      data: string[];
    }

    export interface TimeResponse {
      message: string;
      data: Base[];
    }
  }
}
