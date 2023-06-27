import { IntersectionType } from '@nestjs/swagger';

export class Intent {
  intentId: number;
  name: string;
}
export class IntentRel {}
export class IntentFull extends IntersectionType(Intent, IntentRel) {}
