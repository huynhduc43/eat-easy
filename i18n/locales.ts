// Import the JSON file that contains your translations.
// This is possible because "resolveJsonModule" is enabled in tsconfig.json.
import enTranslations from '@/messages/en.json';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

/**
 * Type helper to recursively traverse the object and create
 * union types for all possible key paths.
 *
 * For example, if the JSON structure is:
 * {
 *   "error": {
 *     "invalid_email": "Invalid email address"
 *   },
 *   "success": {
 *     "account_created": "Account successfully created"
 *   }
 * }
 *
 * This utility type will generate a union like:
 * "error.invalid_email" | "success.account_created"
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object // Check if the current key's value is an object (to continue recursion).
    ? // If it is an object, create the next key path recursively (e.g., "error.invalid_email").
      `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : // If it's not an object, we're at the end of the path (e.g., "success.account_created").
      `${Key}`;
}[keyof ObjectType & (string | number)];

/**
 * This type will extract all possible translation keys from `enTranslations`,
 * producing a union type such as:
 * "error.invalid_email" | "error.password_min_length" | "success.account_created"
 *
 * This allows us to use `TranslationKeys` as a type to validate our translation keys.
 */
export type TranslationKeys = NestedKeyOf<typeof enTranslations>;
