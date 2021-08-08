import { Availability } from "./availability";
import { Product } from "./product";

export class ProductModel{

  constructor(
    public name: string,
    public price: number,
    public discount: number,
    public rating: number,
    public age: number,
    public piece_count: number,
    public availability: Availability,
    public description: string,
    public theme_id: number,
    public picture_url1?: string,
    public picture_url2?: string,
    public picture_url3?: string,
    public product_id?: number
  ) {  }

}
