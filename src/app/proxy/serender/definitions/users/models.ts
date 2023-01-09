import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface GetUserListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
}

export interface UserDto extends EntityDto<string> {
  userName?: string;
  password?: string;
}
