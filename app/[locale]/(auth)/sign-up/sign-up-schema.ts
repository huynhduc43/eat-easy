import { z } from 'zod';

/**
 * Schema for validating login form data using Zod.
 *
 * This schema enforces the following validations:
 * - `email`: Must be a valid email address.
 * - `password`: Must meet the following criteria:
 *   - At least 8 characters long.
 *   - Contains at least one uppercase letter, one lowercase letter, one number, and one special character.
 */
export const SignUpSchema = z.object({
  /**
   * Validates the email field.
   * - Must be a string.
   * - Must be a valid email address.
   */
  email: z.string().email({ message: 'SignUp.form.error.invalid_email' }),

  /**
   * Validates the password field.
   * - Must be a string.
   * - Must be at least 8 characters long.
   * - Must include at least one uppercase letter, one lowercase letter, one number, and one special character.
   */
  password: z
    .string()
    .min(8, { message: 'SignUp.form.error.password_min_length' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
      message: 'SignUp.form.error.password_complexity',
    }),
});
