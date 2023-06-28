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
  ConnectEntityDto,
  CreateEntityDto,
  Entity
} from '../../../shared/models/gen';
import { EntityService } from './entity.service';
import { Observable } from 'rxjs';

@ApiBearerAuth()
@ApiTags('entities')
@Controller('entities')
export class EntityController
  implements BaseController<Entity, ConnectEntityDto, CreateEntityDto>
{
  constructor(private service: EntityService) {}

  @ApiOkResponse({ type: [Entity] })
  @Get()
  findAll(): Observable<Entity[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: Entity })
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<Entity | null> {
    return this.service.findOne({
      entityId: id
    });
  }

  @ApiOkResponse({ type: Entity })
  @Post()
  create(@Body() data: CreateEntityDto): Observable<Entity> {
    return this.service.create(data);
  }

  @ApiOkResponse({ type: Entity })
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: CreateEntityDto
  ): Observable<Entity> {
    return this.service.update({ entityId: id }, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(id: number): Observable<null> {
    return this.service.delete({ entityId: id });
  }
}
