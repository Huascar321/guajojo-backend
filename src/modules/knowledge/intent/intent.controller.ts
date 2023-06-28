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
import {
  ConnectIntentDto,
  CreateIntentDto,
  Intent
} from '../../../shared/models/gen';
import { IntentService } from './intent.service';
import { Observable } from 'rxjs';
import { BaseController } from '../../../shared/models/base-controller.model';

@ApiBearerAuth()
@ApiTags('intents')
@Controller('intents')
export class IntentController
  implements BaseController<Intent, ConnectIntentDto, CreateIntentDto>
{
  constructor(private service: IntentService) {}

  @ApiOkResponse({ type: [Intent] })
  @Get()
  findAll(): Observable<Intent[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: Intent })
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<Intent | null> {
    return this.service.findOne({
      intentId: id
    });
  }

  @ApiOkResponse({ type: Intent })
  @Post()
  create(@Body() data: CreateIntentDto): Observable<Intent> {
    return this.service.create(data);
  }

  @ApiOkResponse({ type: Intent })
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    data: CreateIntentDto
  ): Observable<Intent> {
    return this.service.update({ intentId: id }, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(id: number): Observable<null> {
    return this.service.delete({ intentId: id });
  }
}
