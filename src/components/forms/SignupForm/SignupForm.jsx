import { toast } from 'react-toastify';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import useValidationSchema from '../../../schemas/authFormValidationSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  // registerUser,
  // setUser,
  signUp,
  updateProfile,
} from '../../../redux/auth/authOperations';
// import { selectLoading } from '../../../redux/auth/authSelectors';
// import { useAuth } from '../../../hooks/useAuth';

import s from './SignupForm.module.css';

const SignupForm = ({ handleCloseModal }) => {
  const { signupFormSchema } = useValidationSchema();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  // const loading = useSelector(selectLoading);
  //defaultValues
  //proxy ?? чи є різниця чи стрілочна функція

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmitHandler = async (credentials) => {
    setIsDisabled(true);

    dispatch(signUp(credentials))
      .unwrap()
      .then((user) => {
        dispatch(
          updateProfile({
            displayName: credentials.username,
            idToken: user.idToken,
          })
        );
      })
      .then(() => {
        toast.success('You`ve been successfully registered!');
        handleCloseModal();
        setIsDisabled(false);
      })
      .catch((e) => {
        setIsDisabled(false);

        // toast.error(error?.message);
        //  'The provided email is already in use by an existing user' - errorCode === 'auth/email-already-in-use'
      });

    // console.log(isDirty, isSubmitting, touchedFields, submitCount, isLoading);
  };

  return (
    <Container className="auth-container">
      <h2 className={s.signupTitle}>Registration</h2>
      <div className={s.scrollContainer}>
        <p className={s.signupText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.errorMessageBox}>
            <Input
              type="text"
              placeholder="Name"
              {...register('username')}
              className={errors.username?.message && 'errorInput'}
            />
            <ErrorMessage errorMessage={errors.username?.message} />
          </div>

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
            title={'Sign up'}
            className="formSignupBtn"
            disabled={isDisabled}
          />
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
