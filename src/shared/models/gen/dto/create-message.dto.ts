import { Prisma, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ enum: Role })
  role: Role;
  text: string;
  intent: string;
  entities: Prisma.InputJsonValue;
  timestamp: string;
  payload: Prisma.InputJsonValue;
  conversationId: number;
}
