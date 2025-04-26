import crypto from 'crypto';

/**
 * Hashes an email using SHA-256.
 * Always lowercases and trims the input for consistency.
 * @param email - the email to hash
 * @returns hashed email string
 */
export function hashEmail(email: string): string {
  return crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}
