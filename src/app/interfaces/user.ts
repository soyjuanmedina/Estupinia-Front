import { StreamingService } from "./streamingService";

export interface User {
  email: string;
  id?: number;
  name?: string;
  surname?: string;
  password?: string;
  streamingServices?: Array<StreamingService>
}