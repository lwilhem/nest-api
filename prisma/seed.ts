import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hash = await bcrypt.hash('password', salt);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
