import { Availability } from './availability';

export interface Product {
  product_id?: number;
  name: string;
  price: number;
  discount: number;
  rating: number;
  age: number;
  piece_count: number;
  availability: Availability;
  description: string;
  theme_id: number;
  picture_url1?: string;
  picture_url2?: string;
  picture_url3?: string;

}
