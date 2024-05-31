import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';

import s from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <Container className="auth-container">
      <h2 className={s.loginTitle}>Log In</h2>
      <p className={s.loginText}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <form className={s.form}>
        <Input type="email" name="email" placeholder="Email" />

        <label className={s.label}>
          <Input type="password" name="password" placeholder="Password" />
          <EyeBtn />
        </label>

        <Button
          type="submit"
          title={'Log in'}
          className="formLoginBtn"
          //   loading={loadingSave}
          //   disabled={loadingSave}
        />
      </form>

      {/* <div className={s.login}></div>; */}
    </Container>
  );
};

export default LoginForm;
