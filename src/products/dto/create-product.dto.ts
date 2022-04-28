export class CreateProductDto {
  name: string;
  price: number;
  stock: number;
  desciption?: string;
  shopId: number;
  picture: string;
  path?: string;
}
