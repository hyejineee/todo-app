import { SignUpForm } from '@presentation/features/auth';
import { AuthFormPanel } from '@presentation/widgets/auth';
import { useSearchParams } from 'react-router-dom';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get('form');

  if (!formType || formType === 'login') {
    return <AuthFormPanel />;
  }

  return <SignUpForm />;
};
