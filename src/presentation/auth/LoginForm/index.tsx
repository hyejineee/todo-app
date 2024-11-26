export * from './schema';

import type { LoginUseCase } from '@application/auth';
import { Email, Password } from '@domain/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormComponent, DI_TYPES, diContainer } from '@shared';
import { loginFormSchema, type LoginFormType } from './schema';

const { Form } = createFormComponent<LoginFormType>();

export const LoginForm = () => {
  const login = async (formValue: LoginFormType) => {
    try {
      const email = Email.create(formValue.email);
      const password = Password.create(formValue.password);

      if (!email.isSuccess) throw email.errors;
      if (!password.isSuccess) throw password.errors;

      await diContainer.get<LoginUseCase>(DI_TYPES.LoginUseCase).execute({
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
