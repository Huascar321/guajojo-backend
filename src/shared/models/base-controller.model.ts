import { Observable } from 'rxjs';

export interface BaseController<T, ConnectDto, CreateDto> {
  findAll(): Observable<T[]>;
  findOne(id: number): Observable<T | null>;
  create(data: CreateDto): Observable<T>;
  update(id: number, data: CreateDto): Observable<T>;
  delete(id: number): Observable<null>;
}
