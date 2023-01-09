import type { AuditedEntityDto, EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateStockGroupDto {
  stockTypeId: string;
  code: string;
  name: string;
  parentId?: string;
}

export interface GetStockGroupListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface StockGroupDto extends AuditedEntityDto<string> {
  stockTypeId?: string;
  code?: string;
  name?: string;
  parentId?: string;
}

export interface StockTypeLookupDto extends EntityDto<string> {
  code?: string;
  name?: string;
}

export interface UpdateStockGroupDto {
  stockTypeId: string;
  code: string;
  name: string;
  parentId?: string;
}
