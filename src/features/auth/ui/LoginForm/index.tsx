export * from './schema';
import { useDiContainer } from '@app';
import { Email, Password } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormComponent } from '@shared';
import { LoginUseCase } from 'features/auth/useCases';
import { useRef } from 'react';
import { loginFormSchema, type LoginFormType } from './schema';

const { Form } = createFormComponent<LoginFormType>();

export const LoginForm = () => {
  const di = useDiContainer();
  const useCaseRef = useRef(
    new LoginUseCase(
      di.repositories.authRepository,
      di.repositories.tokenRepository,
    ),
  );

  const login = async (formValue: LoginFormType) => {
    try {
      const email = Email.create(formValue.email);
      const password = Password.create(formValue.password);

      if (!email.isSuccess) throw email.errors;
      if (!password.isSuccess) throw password.errors;

      await useCaseRef.current.execute({
        email: email.value,
        password: password.value,
      });
    } catch (e) {
      // TODO : 에러처리에 대한 로직은 어떻게 구조화 해야 하는가??
      alert(`문제가 발생했당 : ${e}`);
    }
  };

  return (
    <Form mode="onChange" resolver={zodResolver(loginFormSchema)}>
      <Form.Field name="email" />
      <Form.Field name="password" />
      <Form.Submit onClick={login}>로그인</Form.Submit>
    </Form>
  );
};
