import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash('password', salt);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'admin',
      email: 'wilhem.lecanu@gmail.com',
      role: Role.ADMIN,
      password: hash,
    },
  });
  return admin;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
