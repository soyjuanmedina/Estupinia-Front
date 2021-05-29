import { ScheduleDay } from "./scheduleDay";
import { ScheduleException } from "./scheduleException";

export interface Schedule {
  id?: number;
  days?: Array<ScheduleDay>;
  exceptions?: Array<ScheduleException>;
}