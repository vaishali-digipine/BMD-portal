import { Application } from '../applications/applications.type';
import { Response } from '../../@common/types/ApiLayer.types';

export namespace Meetings {
  export type Id = string;

  export interface Base {
    _id: Id;
    applicationId: Application.Id;
    roomId: string;
    status: EMeetingStatus;
    userJoinedAt: Date | null;
    clerkJoinedAt: Date | null;
    startedAt: Date | null;
    endedAt: Date | null;
  }

  export type Detail = Omit<Base, 'applicationId'> & { applicationId: Application.Base };

  export namespace Apis {
    export type GetTodayMeetingResponse = Response.Paginated<Base>;
  }
}

export enum EMeetingStatus {
  scheduled = 'scheduled',
  waiting = 'waiting',
  in_progress = 'in_progress',
  completed = 'completed',
  cancelled = 'cancelled',
}
