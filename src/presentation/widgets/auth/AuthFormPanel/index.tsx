import { LoginForm } from '@presentation/features/auth';
import { Link } from 'react-router-dom';

const AuthFormPanel = () => {
  return (
    <div>
      <LoginForm />
      <span>아직 회원이 아니신가요?</span>
      <Link to="/auth?form=signup">회원가입</Link>
    </div>
  );
};

export default AuthFormPanel;
