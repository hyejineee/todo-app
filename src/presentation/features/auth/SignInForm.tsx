import type { LoginUseCase } from '@/application/auth';
import { Email, Password } from '@/domain/auth';
import { DI_TYPES, diContainer } from '@/shared/config';
import { Column, Row } from '@/shared/ui/components';
import { Button } from '@/shared/ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/form';
import { Input } from '@/shared/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: Email.schema,
  password: Password.schema,
});
type LoginFormType = z.infer<typeof loginFormSchema>;

export const SignInForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });
  const { control, handleSubmit } = form;

  const signInUser = handleSubmit(async (formValue) => {
    try {
      const email = Email.create(formValue.email);
      const password = Password.create(formValue.password);

      if (!email.isSuccess) throw email.errors;
      if (!password.isSuccess) throw password.errors;

      await diContainer.get<LoginUseCase>(DI_TYPES.LoginUseCase).execute({
        email: email.value,
        password: password.value,
      });

      navigate('/todos');
    } catch (e) {
      // TODO : 에러처리하기
      alert(e);
    }
  });

  return (
    <Form {...form}>
      <Column css={{ gap: 16, alignItems: 'center' }}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem css={{ width: '100%' }}>
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
            <FormItem css={{ width: '100%' }}>
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

        <Button
          type="submit"
          onClick={signInUser}
          css={{ marginTop: 20, width: '100%' }}
        >
          로그인
        </Button>

        <Row css={{ alignItems: 'center' }}>
          <FormDescription>아직 회원이 아닌가요?</FormDescription>
          <Button asChild variant="link">
            <Link to={'?form=signup'}>회원가입</Link>
          </Button>
        </Row>
      </Column>
    </Form>
  );
};
