import type { CreateUserDto, GetUserListDto, UpdateUserDto, UserDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LoadResult } from '../../../dev-extreme/asp-net/data/response-model/models';
import type { DataSourceLoadOptions } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';
  

  create = (input: CreateUserDto) =>
    this.restService.request<any, UserDto>({
      method: 'POST',
      url: '/api/app/user',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/user/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, UserDto>({
      method: 'GET',
      url: `/api/app/user/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: GetUserListDto) =>
    this.restService.request<any, PagedResultDto<UserDto>>({
      method: 'GET',
      url: '/api/app/user',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  loadUsersByLoadOptions = (loadOptions: DataSourceLoadOptions) =>
    this.restService.request<any, LoadResult>({
      method: 'POST',
      url: '/api/app/user/load-users',
    },
    { apiName: this.apiName });
  

  update = (id: string, input: UpdateUserDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/user/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
