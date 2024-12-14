import { PageInfo } from '@/app/lib/actions/nocodb.type';
import { Role } from '@/common/enums';
import { ApiResponse } from '@/common/types';

export type CheckUserExistsResponse = ApiResponse<{ isExist: boolean }>;

export type User = {
  Id: number;
  email: string;
  password: string;
  role: Role;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Stats = {
  dbQueryTime: string;
};

export type GetUsersResponse = {
  list: User[];
  pageInfo: PageInfo;
  stats: Stats;
};
