import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateStockTypeDto {
  code: string;
  name: string;
  allowMinusOpr: boolean;
}

export interface GetStockTypeListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface StockTypeDto extends EntityDto<string> {
  code?: string;
  name?: string;
  allowMinusOpr: boolean;
}

export interface UpdateStockTypeDto {
  code: string;
  name: string;
  allowMinusOpr: boolean;
}
