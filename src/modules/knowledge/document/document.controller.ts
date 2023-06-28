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
import { BaseController } from '../../../shared/models/base-controller.model';
import {
  ConnectDocumentDto,
  CreateDocumentDto,
  Document
} from '../../../shared/models/gen';
import { DocumentService } from './document.service';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('documents')
@Controller('documents')
export class DocumentController
  implements BaseController<Document, ConnectDocumentDto, CreateDocumentDto>
{
  constructor(private service: DocumentService) {}

  @ApiOkResponse({ type: [Document] })
  @Get()
  findAll(): Observable<Document[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: Document })
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<Document | null> {
    return this.service.findOne({ documentId: id });
  }

  @ApiOkResponse({ type: Document })
  @Post()
  create(@Body() data: CreateDocumentDto): Observable<Document> {
    return this.service.create(data);
  }

  @ApiOkResponse({ type: Document })
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: CreateDocumentDto
  ): Observable<Document> {
    return this.service.update({ documentId: id }, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(id: number): Observable<null> {
    return this.service.delete({ documentId: id });
  }
}
