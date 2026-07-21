import { District } from '../districts/districts.type';
import { Response } from '../../@common/types/ApiLayer.types';

export namespace Office {
  export type Id = string;

  export interface Base {
    _id: Id;
    districtId: District.Id;
    name: string;
    createdAt: string;
    updated: string;
  }

  export type Detail = Omit<Base, 'districtId'> & {
    districtId: District.Base;
  };
  export type List = Detail[];

  export namespace Apis {
    export interface CreatePayload {
      name: string;
      districtId: District.Id;
    }
    export type CreateResponse = Response.Normal<Detail>;
    export type ListResponse = Response.Paginated<Detail>;
  }
}
