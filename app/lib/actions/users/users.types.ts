import { BaseEntity, PageInfo } from '@/app/lib/actions/nocodb.type';
import { Role } from '@/common/enums';
import { ApiResponse } from '@/common/types';

export type CheckUserExistsResponse = ApiResponse<{ isExist: boolean }>;

export type User = BaseEntity & {
  email: string;
  password: string;
  role: Role;
};

export type Stats = {
  dbQueryTime: string;
};

export type GetUsersResponse = {
  list: User[];
  pageInfo: PageInfo;
  stats: Stats;
};

export type GetUserByEmailResponse = ApiResponse<User | null>;
