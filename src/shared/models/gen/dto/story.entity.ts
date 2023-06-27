import { IntersectionType } from '@nestjs/swagger';

export class Story {
  storyId: number;
  name: string;
}
export class StoryRel {}
export class StoryFull extends IntersectionType(Story, StoryRel) {}
