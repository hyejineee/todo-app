import { Column } from '@/shared/ui/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/card';
import { useSearchParams } from 'react-router-dom';
import { SignInForm, SignUpForm } from '../features/auth';

export const AuthPage = () => {
  const [params] = useSearchParams();
  const isSignInForm = !params.get('form') || params.get('form') === 'signin';

  return (
    <Column
      css={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card css={{ width: '50%', height: '50%', maxWidth: 400, minWidth: 300 }}>
        <CardHeader>
          <CardTitle>{isSignInForm ? 'Sign In' : 'Sign Up'}</CardTitle>
        </CardHeader>

        <CardContent>
          {isSignInForm ? <SignInForm /> : <SignUpForm />}
        </CardContent>
      </Card>
    </Column>
  );
};
