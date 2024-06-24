import * as Yup from 'yup';
import {
  USER_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../helpers/regexPatterns';
import {
  USER_NAME_ERROR_MESSAGE,
  REQUIRED_USER_NAME_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
} from '../helpers/constants';

const useValidationSchema = () => {
  const baseValidationSchema = {
    email: Yup.string()
      .trim()
      .required(REQUIRED_EMAIL_MESSAGE)
      .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),

    password: Yup.string()
      .trim()
      .required(REQUIRED_PASSWORD_MESSAGE)
      .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  };

  const signupFormSchema = Yup.object().shape({
    ...baseValidationSchema,
    username: Yup.string()
      .trim()
      .required(REQUIRED_USER_NAME_MESSAGE)
      .matches(USER_NAME_REGEX, USER_NAME_ERROR_MESSAGE),
  });

  const signinFormSchema = Yup.object().shape({
    ...baseValidationSchema,
  });

  return { signupFormSchema, signinFormSchema };
};
export default useValidationSchema;
