import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import useValidationSchema from '../../../schemas/authFormValidationSchema';
import { signIn } from '../../../redux/auth/authOperations';

import s from './LoginForm.module.css';

const LoginForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const { signinFormSchema } = useValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinFormSchema),
  });

  const onSubmitHandler = async (credentials) => {
    setIsDisabled(true);

    dispatch(signIn(credentials))
      .unwrap()
      .then(() => {
        toast.success('Welcome!');
        handleCloseModal();
        setIsDisabled(false);
      })
      .catch(() => {
        setIsDisabled(false);
      });
  };

  return (
    <Container className="auth-container">
      <h2 className={s.loginTitle}>Log In</h2>

      <div className={s.scrollContainer}>
        <p className={s.loginText}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>

        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.errorMessageBox}>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={errors.email?.message && 'errorInput'}
            />
            <ErrorMessage errorMessage={errors.email?.message} />
          </div>

          <div className={s.lastErrorMessageBox}>
            <label className={s.label}>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
                className={errors.password?.message && 'errorInput'}
                autoComplete="new-password"
              />
              <EyeBtn />
            </label>
            <ErrorMessage errorMessage={errors.password?.message} />
          </div>

          <Button
            type="submit"
            title={'Log in'}
            className="formLoginBtn"
            disabled={isDisabled}
          />
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
