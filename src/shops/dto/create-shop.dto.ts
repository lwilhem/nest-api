export class CreateShopDto {
  name: string;
  description?: string;
  retailerId: number;
  picture?: Buffer | null;
}
