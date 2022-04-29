/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import Stripe from 'stripe';
const prisma = new PrismaClient();

async function main() {
  const name = 'admin';
  const email = 'wilhem.lecanu@gmail.com';
  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: '2020-08-27',
  });
  const stripeId = await stripe.customers.create({ name, email });

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash('password', salt);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      role: Role.ADMIN,
      password: hash,
      email: 'wilhem.lecanu@gmail.com',
      stripeCustomerId: stripeId.id,
    },
  });

  const test = await stripe.customers.create({
    name: 'buyer',
    email: 'buyer@test.com',
  });
  const buyer = await prisma.user.create({
    data: {
      username: 'buyer',
      role: Role.BUYER,
      password: hash,
      email: 'buyer@test.com',
      stripeCustomerId: test.id,
    },
  });

  for (let i = 1; i <= 10; i++) {
    const retailer = await prisma.user.create({
      data: {
        username: `Vendeur n°${i}`,
        password: hash,
        email: `vendeur${i}@test.com`,
        role: Role.RETAILER,
        stripeCustomerId: 'toChange',
      },
    });
    const ayo = await stripe.customers.create({
      name: retailer.username,
      email: retailer.email,
    });
    await prisma.user.update({
      where: { id: retailer.id },
      data: { stripeCustomerId: ayo.id },
    });
    const shop = await prisma.shop.create({
      data: {
        name: `Boutique n°${i}`,
        retailerId: retailer.id,
      },
    });
    for (let j = 1; j <= 50; j++) {
      const product = prisma.product.upsert({
        where: { id: j * i },
        update: {},
        create: {
          name: `Produits n°${randomInt(1, 100000)}`,
          price: 20.99,
          stock: 100,
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
