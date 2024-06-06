import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import useValidationSchema from '../../../schemas/authFormValidationSchema';

import s from './SignupForm.module.css';

const SignupForm = () => {
  const { signupFormSchema } = useValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <Container className="auth-container">
      <h2 className={s.signupTitle}>Registration</h2>
      <p className={s.signupText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={s.errorMessageBox}>
          <Input
            // name="username"
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
          <ErrorMessage
            errorMessage={errors.username?.message}
            // touched={touched.location}
            // className="locationErrMess"
          />
          {/* <p>{errors.username?.message}</p> */}
        </div>

        <div className={s.errorMessageBox}>
          <Input
            type="email"
            // name="email"
            placeholder="Email"
            {...register('email')}
            className={errors.email?.message && 'errorInput'}

            // required
            // className={`${s.locationInput}  ${
            //   touched.location && errors.location && s.errorInput
            // }`}
          />
          <ErrorMessage
            errorMessage={errors.email?.message}
            // touched={touched.location}
            // className="locationErrMess"
          />
          {/* <p>{errors.email?.message}</p> */}
        </div>

        <div className={s.lastErrorMessageBox}>
          <label className={s.label}>
            <Input
              type="password"
              // name="password"
              placeholder="Password"
              {...register('password')}
              className={errors.password?.message && 'errorInput'}
              autoComplete="new-password"

              // required
              // className={`${s.locationInput}  ${
              //   touched.location && errors.location && s.errorInput
              // }`}
            />
            <EyeBtn />
          </label>
          <ErrorMessage
            errorMessage={errors.password?.message}
            // touched={touched.location}
            // className="locationErrMess"
          />
          {/* <p>{errors.password?.message}</p> */}
        </div>

        <Button
          type="submit"
          title={'Sign up'}
          className="formSignupBtn"
          //   loading={loadingSave}
          //   disabled={loadingSave}
        />
      </form>
    </Container>
  );
};

export default SignupForm;
