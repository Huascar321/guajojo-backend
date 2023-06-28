import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../../shared/models/base-controller.model';
import {
  ConnectStoryDto,
  CreateStoryDto,
  Story
} from '../../../shared/models/gen';
import { StoryService } from './story.service';
import { Observable } from 'rxjs';

@ApiBearerAuth()
@ApiTags('stories')
@Controller('stories')
export class StoryController
  implements BaseController<Story, ConnectStoryDto, CreateStoryDto>
{
  constructor(private service: StoryService) {}

  @ApiOkResponse({ type: [Story] })
  @Get()
  findAll(): Observable<Story[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: Story })
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<Story | null> {
    return this.service.findOne({ storyId: id });
  }

  @ApiOkResponse({ type: Story })
  @Post()
  create(@Body() data: CreateStoryDto): Observable<Story> {
    return this.service.create(data);
  }

  @ApiOkResponse({ type: Story })
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: CreateStoryDto
  ): Observable<Story> {
    return this.service.update({ storyId: id }, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(id: number): Observable<null> {
    return this.service.delete({ storyId: id });
  }
}
