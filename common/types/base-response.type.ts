export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error?: string; fieldErrors?: Record<string, unknown> };
