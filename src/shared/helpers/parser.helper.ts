import { InternalServerErrorException } from '@nestjs/common';

export function parseTimeToSeconds(timeString: string): number {
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new InternalServerErrorException('Invalid time string format');
  }
  const value = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 60 * 60 * 24;
    default:
      throw new InternalServerErrorException(`Invalid time unit: ${unit}`);
  }
}
