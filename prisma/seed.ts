import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/core/services/prisma/prisma.service';
import { UserService } from '../src/modules/auth/user/user.service';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { getEnvironmentVariable } from '../src/shared/helpers/environment.helper';

const prisma = new PrismaClient();
const prismaService = new PrismaService();
const userService = new UserService(prismaService);

async function main(): Promise<void> {
  console.log('Seeding...');
  const adminUsername = getEnvironmentVariable('ADMIN_USERNAME');
  const adminPassword = getEnvironmentVariable('ADMIN_PASSWORD');
  if (adminUsername && adminPassword) {
    lastValueFrom(userService.findOne({ username: adminUsername })).then(
      async (foundUser) => {
        if (!foundUser) registerNewUser(adminUsername, adminPassword);
      }
    );
  }
}

async function registerNewUser(
  username: string,
  password: string
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);
  await lastValueFrom(
    userService.create({
      username,
      password: hashedPassword
    })
  );
}

main()
  .then(async () => {
    console.log('Seeding process finished');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
