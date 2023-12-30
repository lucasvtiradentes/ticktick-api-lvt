import { z } from 'zod';

export const ticktickResponseErrorSchema = z.object({
  errorId: z.string(),
  errorCode: z.enum(['user_not_sign_on', 'username_password_not_match', 'incorrect_password_too_many_times']),
  errorMessage: z.string(),
  data: z.any().nullable()
});

export class TicktickError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TicktickError.prototype);
  }
}
