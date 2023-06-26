import { InternalServerErrorException } from '@nestjs/common';

export function getEnvironmentVariable(token: string): string {
  const variable = process.env[token];
  if (variable) return variable;
  throw new InternalServerErrorException(
    `Environment variable ${token} not found in env files`
  );
}
