import nocodb, { USERS_TABLE_ID } from '@/app/lib/actions/nocodb';
import { CheckUserExistsResponse } from '@/app/lib/actions/users/users.types';

export async function checkUserExists(
  email: string
): Promise<CheckUserExistsResponse> {
  try {
    await nocodb.get<{ Id: number }>(
      `/tables/${USERS_TABLE_ID}/records?email=${email}`
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return {
      success: false,
      error: 'An error occurred while checking user existence.',
    };
  }
}
