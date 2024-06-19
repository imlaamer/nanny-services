import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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
import { registerUser, setUser } from '../../../redux/auth/authOperations';
import { selectLoading } from '../../../redux/auth/authSelectors';
import { createUserAndSetData } from '../../../services/auth-api';
import { useAuth } from '../../../hooks/useAuth';

import s from './SignupForm.module.css';


const SignupForm = ({ handleCloseModal }) => {
  const { signupFormSchema } = useValidationSchema();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const loading = useSelector(selectLoading);
  //defaultValues
  //proxy ?? чи є різниця чи стрілочна функція

  const {
    register,
    handleSubmit,
    formState,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      touchedFields,
      submitCount,
      isLoading,
    },

    reset,
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmitHandler = async (credentials) => {
    setIsDisabled(true);

    // console.log(isDirty, isSubmitting, touchedFields, submitCount, isLoading);

    const { username, email, password } = credentials;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user: { uid, accessToken, email } }) => {
        dispatch(
          setUser({
            id: uid,
            token: accessToken,
            email,
            username,
            favorites: [],
          })
        );
      })
      .then(() => {
        toast.success('You`ve been successfully registered!');
        handleCloseModal();
        setIsDisabled(false);
      })
      .catch((error) => {
        setIsDisabled(false);
        const errorCode = error?.code;
        if (errorCode === 'auth/email-already-in-use') {
          return toast.error(
            'The provided email is already in use by an existing user'
          );
        }
        toast.error(error?.message);
      });
    // dispatch(registerUser(data))
    //   .unwrap()
    //   .then(() => {
    //     // setSubmitting(false); //знайти в реакт хук форм що дізейблить кнопку
    //     handleCloseModal();
    //     // reset();
    //   })
    //   .catch((error) => console.error(error));
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
              // role="presentation"
              // autocomplete="off"
              // autoComplete="off"
              // aria-autocomplete="none"
              // required
              // className={`${s.locationInput}  ${
              //   touched.location && errors.location && s.errorInput
              // }`}
            />
            <ErrorMessage errorMessage={errors.username?.message} />
          </div>

          <div className={s.errorMessageBox}>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={errors.email?.message && 'errorInput'}
              // className={`${s.locationInput}  ${
              //   touched.location && errors.location && s.errorInput
              // }`}
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
                // className={`${s.locationInput}  ${
                //   touched.location && errors.location && s.errorInput
                // }`}
              />
              <EyeBtn />
            </label>
            <ErrorMessage errorMessage={errors.password?.message} />
          </div>

          <Button
            type="submit"
            title={'Sign up'}
            className="formSignupBtn"
            loading={loading || isLoading}
            // loading={true}
            // disabled={isSubmitting || isLoading}
            disabled={isDisabled}
          />
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
