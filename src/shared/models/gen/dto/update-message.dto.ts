import { Prisma, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({ enum: Role })
  role?: Role;
  text?: string;
  intent?: string;
  entities?: Prisma.JsonValue;
  timestamp?: string;
  payload?: Prisma.JsonValue;
}
