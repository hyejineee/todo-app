import { Email, Password } from '@entities';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: Email.schema,
  password: Password.schema,
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
