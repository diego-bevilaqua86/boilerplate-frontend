import { z } from 'zod';

export const RequiredString = (message: string) => z.string({ error: message }).trim().min(1, message);

export const RequiredEmail = (requiredMsg: string, emailMsg: string) => z.email({ error: requiredMsg }).trim();
