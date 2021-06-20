import { Theme } from "./theme";
import { User } from "./user";

export interface CommunicationProposal {
  from: User;
  to: User;
  theme: Theme;
  type: string;
  answer?: string;
}