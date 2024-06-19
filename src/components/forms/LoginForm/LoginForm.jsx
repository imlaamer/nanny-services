import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
import EyeBtn from '../../EyeBtn/EyeBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import useValidationSchema from '../../../schemas/authFormValidationSchema';
import { getUser, loginUser } from '../../../redux/auth/authOperations';

import s from './LoginForm.module.css';

const LoginForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const { signinFormSchema } = useValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signinFormSchema),
  });

  const onSubmitHandler = async (credentials) => {
    const { email, password } = credentials;
    const auth = getAuth();
   
    //error в консолі навіть з сatch 
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user: { uid, accessToken } }) => {
        dispatch(
          getUser({
            id: uid,
            token: accessToken,
          })
        );
      })
      .then(() => {
        toast.success('Welcome!');
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(
          'Invalid login or password. Also, please check if you have registered.'
        );
        // toast.error(error?.message);
      });
    // dispatch(loginUser(data))
    //   .unwrap()
    //   .then(() => {
    //     // setSubmitting(false); //знайти в реакт хук форм що дізейблить кнопку
    //     // reset();
    //     handleCloseModal();
    //   })
    //   .catch((error) => console.error(error?.message));
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
            //   loading={loadingSave}
            //   disabled={loadingSave}
          />
        </form>
      </div>
      {/* <div className={s.login}></div>; */}
    </Container>
  );
};

export default LoginForm;
