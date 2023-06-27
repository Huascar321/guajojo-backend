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
  const createdUser = await lastValueFrom(
    userService.create({
      username,
      password: hashedPassword
    })
  );
  const createdDepartment = await prisma.department.create({
    data: {
      name: 'Innovación y tecnología'
    }
  });
  const createdJobPosition = await prisma.jobPosition.create({
    data: {
      departmentId: createdDepartment.departmentId,
      name: 'Ingeniero de Software'
    }
  });
  await prisma.person.create({
    data: {
      userId: createdUser.userId,
      jobPositionId: createdJobPosition.jobPositionId,
      fullname: 'Huáscar Suárez Chávez',
      email: 'oxhuascar321@outlook.com'
    }
  });
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
