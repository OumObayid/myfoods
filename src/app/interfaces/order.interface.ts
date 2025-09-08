import { Good } from "./goods.interface";

export interface Order {
  items: Good[];
  total: number;
  status: string;
  createdAt: any;
  userId: string;
}
