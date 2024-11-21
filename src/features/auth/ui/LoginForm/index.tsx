export * from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormComponent, Email, Password } from '@shared';
import { loginFormSchema, type LoginFormType } from './schema';
import { useDiContainer } from '@app';
import { useRef } from 'react';
import { LoginUseCase } from 'features/auth/useCases';

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
