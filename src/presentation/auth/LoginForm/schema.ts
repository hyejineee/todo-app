import { Email, Password } from '@domain/auth';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: Email.schema,
  password: Password.schema,
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
