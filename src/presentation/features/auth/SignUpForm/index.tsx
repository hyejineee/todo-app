import type { RegisterUserUseCase } from '@application/auth';
import { Email, Password } from '@domain/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { DI_TYPES, diContainer } from '@shared/config';
import { createFormComponents } from '@shared/ui';
import { z } from 'zod';

const signupFormSchema = z
  .object({
    email: Email.schema,
    password: Password.schema,
    confirmPassword: Password.schema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

type SignUpFormType = z.infer<typeof signupFormSchema>;

const { Form } = createFormComponents<SignUpFormType>();

const SignupFormContent = () => {
  const signup = async (formValue: SignUpFormType) => {
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
    } catch (e) {
      alert(`회원가입에 문제가 있당 : ${e}`);
    }
  };

  return (
    <>
      <Form.Field name="email" label="이메일" />
      <Form.Field name="password" label="비밀번호" />
      <Form.Field name="confirmPassword" label="비밀번호 확인" />
      <Form.Submit onClick={signup}>회원가입</Form.Submit>
    </>
  );
};

const SignUpForm = () => {
  return (
    <Form mode="onChange" resolver={zodResolver(signupFormSchema)}>
      <SignupFormContent />
    </Form>
  );
};

export default SignUpForm;
