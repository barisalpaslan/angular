import type { CreateStockGroupDto, GetStockGroupListDto, StockGroupDto, StockTypeLookupDto, UpdateStockGroupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LoadResult } from '../../../dev-extreme/asp-net/data/response-model/models';
import type { DataSourceLoadOptions } from '../shared/models';
import { DevxAspNetDataService } from 'src/app/stock-groups/devx.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockGroupService {
  apiName = 'Default';


  create = (input: CreateStockGroupDto) :Observable<StockGroupDto> =>
    this.restService.request<any, StockGroupDto>({
      method: 'POST',
      url: '/api/app/stock-group',
      body: input,
    },
    { apiName: this.apiName });


  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/stock-group/${id}`,
    },
    { apiName: this.apiName });


  get = (id: string) =>
    this.restService.request<any, StockGroupDto>({
      method: 'GET',
      url: `/api/app/stock-group/${id}`,
    },
    { apiName: this.apiName });


  getList = (input: GetStockGroupListDto) =>
    this.restService.request<any, PagedResultDto<StockGroupDto>>({
      method: 'GET',
      url: '/api/app/stock-group',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });


  getStockTypeLookup = () =>
    this.restService.request<any, ListResultDto<StockTypeLookupDto>>({
      method: 'GET',
      url: '/api/app/stock-group/stock-type-lookup',
    },
    { apiName: this.apiName });


  loadStockGroups2ByLoadOptions = (loadOptions: DataSourceLoadOptions) =>
    this.restService.request<any, LoadResult>({
      method: 'POST',
      url: '/api/app/stock-group/load-stock-groups2',
    },
    { apiName: this.apiName });


  loadStockGroupsByLoadOptions = (loadOptions: DataSourceLoadOptions) =>
    this.restService.request<any, LoadResult>({
      method: 'POST',
      url: '/api/app/stock-group/load-stock-groups',
    },
    { apiName: this.apiName });


  update = (id: string, input: UpdateStockGroupDto) :Observable<any> =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/stock-group/${id}`,
      body: input,
    },
    { apiName: this.apiName });

    loadStockGroup2 = () => this.devexservice.aspnetDataWithoutKey('/api/Definitions/StockGroups/load-stock-groups2');

    loadStockType = () => this.devexservice.aspnetDataWithoutKey('/api/Definitions/StockTypes/load-stock-types');

  constructor(private restService: RestService, private devexservice:DevxAspNetDataService) {}
}
