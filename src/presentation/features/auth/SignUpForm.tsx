import type { RegisterUserUseCase } from '@/application/auth';
import { Email, Password } from '@/domain/auth';
import { DI_TYPES, diContainer } from '@/shared/config';
import { Column } from '@/shared/ui/components';
import { Button } from '@/shared/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/form';
import { Input } from '@/shared/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signupFormSchema = z
  .object({
    email: Email.schema,
    password: Password.schema,
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

type SignupFormType = z.infer<typeof signupFormSchema>;

export const SignUpForm = () => {
  const navigate = useNavigate();
  const form = useForm<SignupFormType>({
    mode: 'onChange',
    resolver: zodResolver(signupFormSchema),
  });
  const { control, handleSubmit } = form;

  const createUser = handleSubmit(async (formValue) => {
    try {
      const email = Email.create(formValue.email);
      const password = Password.create(formValue.password);

      if (!email.isSuccess) throw email.errors;
      if (!password.isSuccess) throw password.errors;

      await diContainer
        .get<RegisterUserUseCase>(DI_TYPES.RegisterUserUseCase)
        .execute({
          email: email.value,
          password: password.value,
        });

      navigate('/');
    } catch (e) {
      // TODO : 에러 ui 처리
      alert(e);
    }
  });

  return (
    <Form {...form}>
      <Column css={{ gap: 16 }}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="비밀번호를 입력해 주세요."
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" onClick={createUser} css={{ marginTop: 20 }}>
          회원가입
        </Button>
      </Column>
    </Form>
  );
};
