import { ApiResponse } from '@/common/types';

export type CreateUserResponse = ApiResponse<{ Id: number }>;

export type LoginResponse = ApiResponse<{ accessToken: string }>;
