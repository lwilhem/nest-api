export class CreateShopDto {
  name: string;
  description?: string;
  retailerId: number;
  picture?: string | null;
  path?: string | null;
}
