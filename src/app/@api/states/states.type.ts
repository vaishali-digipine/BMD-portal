import { Response } from '../../@common/types/ApiLayer.types';

export namespace State {
  export type Id = string;

  export interface Base {
    _id: Id;
    name: string;
    createdAt: string;
    updated: string;
  }
  export type Detail = Base;

  export type List = Detail[];

  export namespace Apis {
    export interface CreatePayload {
      name: string;
    }
    export type CreateResponse = Response.Normal<Detail>;
    export type ListResponse = Response.Paginated<Base>;
  }
}
