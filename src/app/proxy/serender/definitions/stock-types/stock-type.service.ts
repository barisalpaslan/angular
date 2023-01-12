import type { CreateStockTypeDto, GetStockTypeListDto, StockTypeDto, UpdateStockTypeDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LoadResult } from '../../../dev-extreme/asp-net/data/response-model/models';
import type { DataSourceLoadOptions } from '../shared/models';
import { Observable } from 'rxjs';
import { DevxAspNetDataService } from 'src/app/stock-groups/devx.service';

@Injectable({
  providedIn: 'root',
})
export class StockTypeService {
  apiName = 'Default';


  create = (input: CreateStockTypeDto) :Observable<StockTypeDto> =>
    this.restService.request<any, StockTypeDto>({
      method: 'POST',
      url: '/api/app/stock-type',
      body: input,
    },
    { apiName: this.apiName });


  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/stock-type/${id}`,
    },
    { apiName: this.apiName });


  get = (id: string) =>
    this.restService.request<any, StockTypeDto>({
      method: 'GET',
      url: `/api/app/stock-type/${id}`,
    },
    { apiName: this.apiName });


  getList = (input: GetStockTypeListDto) =>
    this.restService.request<any, PagedResultDto<StockTypeDto>>({
      method: 'GET',
      url: '/api/app/stock-type',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });


  loadStockTypesByLoadOptions = (loadOptions: DataSourceLoadOptions) =>
    this.restService.request<any, LoadResult>({
      method: 'POST',
      url: '/api/app/stock-type/load-stock-types',
    },
    { apiName: this.apiName });


  update = (id: string, input: UpdateStockTypeDto) :Observable<any> =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/stock-type/${id}`,
      body: input,
    },
    { apiName: this.apiName });

    loadStockType = ()=> this.devexservice.aspnetDataWithoutKey('/api/Definitions/StockTypes/load-stock-types');


  constructor(private restService: RestService, private devexservice:DevxAspNetDataService) {}
}
