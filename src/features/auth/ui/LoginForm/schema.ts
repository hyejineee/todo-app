import { Email } from '@shared';

import { emailFormSchema, passwordSchema } from 'shared/lib';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: emailFormSchema.superRefine((value, ctx) => {
    const errors = Email.validationBusinessRules(value);
    if (errors.length > 0) return ctx;

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: errors[0].msg,
    });
  }),
  password: passwordSchema,
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
