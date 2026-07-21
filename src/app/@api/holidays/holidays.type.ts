import { Office } from '../offices/offices.type';
import { Response } from '../../@common/types/ApiLayer.types';
import { District } from '../districts/districts.type';
import { State } from '../states/states.type';

export namespace Holiday {
  export type Id = string;

  export interface Base {
    _id: Id;
    holidaydate: Date;
    year: number;
    title: string;
    discription: string;
    officeId: Office.Id;
    isNationalHoliday: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Omit<Base, 'officeId'> & {
    officeId: Office.Base;
  };

  export type List = Detail[];

  export namespace Apis {
    export interface CreatePayload {
      holidayDate: Date;
      year: number;
      title: string;
      description: string;
      officeId: Office.Id;
      isNationalHoliday: boolean;
    }

    export type CreateResponse = Response.Normal<Detail>;
    export type ListResponse = Response.Paginated<Detail>;
  }
}
