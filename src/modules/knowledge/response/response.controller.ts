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
  ConnectResponseDto,
  CreateResponseDto,
  Response
} from '../../../shared/models/gen';
import { ResponseService } from './response.service';
import { Observable } from 'rxjs';

@ApiBearerAuth()
@ApiTags('responses')
@Controller('responses')
export class ResponseController
  implements BaseController<Response, ConnectResponseDto, CreateResponseDto>
{
  constructor(private service: ResponseService) {}

  @ApiOkResponse({ type: [Response] })
  @Get()
  findAll(): Observable<Response[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: Response })
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<Response | null> {
    return this.service.findOne({ responseId: id });
  }

  @ApiOkResponse({ type: Response })
  @Post()
  create(@Body() data: CreateResponseDto): Observable<Response> {
    return this.service.create(data);
  }

  @ApiOkResponse({ type: Response })
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: CreateResponseDto
  ): Observable<Response> {
    return this.service.update({ responseId: id }, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(id: number): Observable<null> {
    return this.service.delete({ responseId: id });
  }
}
