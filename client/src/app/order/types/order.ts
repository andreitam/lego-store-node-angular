import { CartItem } from "../../shopping-cart/types/cart-item";
import { OrderStatus } from "./order-status";

export interface Order {
  items: CartItem[];
  status: OrderStatus;
  date_time: Date;
  total: number;
  customer_id: number;
}
