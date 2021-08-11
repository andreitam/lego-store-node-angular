import { Rights } from "./rights";

export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  adress: string;
  rights: Rights;
  password: string;
}
