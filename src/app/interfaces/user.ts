import { Schedule } from "./schedule";
import { Theme } from "./theme";

export interface User {
  id?: number;
  active?: boolean;
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  themes?: Array<Theme>;
  stars?: Number;
  acceptReservations?: boolean;
  schedule?: Schedule;
}