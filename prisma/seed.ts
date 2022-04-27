import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 10; i++) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('password', salt);
    const retailer = await prisma.user.upsert({
      where: { id: i },
      update: {},
      create: {
        username: `Vendeur n°${i}`,
        email: `vendeur${i}@gmail.com`,
        password: hash,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const shop = await prisma.shop.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Boutique n°${i}`,
        retailerId: retailer.id,
      },
    });
    for (let j = 1; j <= 50; j++) {
      const foo = j * i;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const product = await prisma.product.upsert({
        where: { id: foo },
        update: {},
        create: {
          name: `Produit n°${randomInt(1, 1000000)}`,
          price: 20.99,
          stock: 12,
          shopId: shop.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
