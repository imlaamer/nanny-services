import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';

import s from './SignupForm.module.css';

const SignupForm = () => {
  return (
    <Container className="auth-container">
      <h2 className={s.signupTitle}>Registration</h2>
      <p className={s.signupText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form className={s.form}>
        <Input name="username" type="text" placeholder="Name" />

        <Input type="email" name="email" placeholder="Email" />

        <label className={s.label}>
          <Input type="password" name="password" placeholder="Password" />
          <EyeBtn />
        </label>

        <Button
          type="submit"
          title={'Sign up'}
          className="formSignupBtn"
          //   loading={loadingSave}
          //   disabled={loadingSave}
        />
      </form>

      {/* <div className={s.login}></div>; */}
    </Container>
  );
};

export default SignupForm;
