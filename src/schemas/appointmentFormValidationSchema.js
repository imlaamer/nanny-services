import * as Yup from 'yup';
import {
  USER_NAME_REGEX,
  EMAIL_REGEX,
  TEL_REGEX,
  AGE_REGEX,
  ADDRESS_REGEX,
  TIME_REGEX,
} from '../helpers/regexPatterns';
import {
  USER_NAME_ERROR_MESSAGE,
  REQUIRED_USER_NAME_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
  REQUIRED_TIME_MESSAGE,
  COMMENT_ERROR_MESSAGE,
  REQUIRED_COMMENT_MESSAGE,
  REQUIRED_ADDRESS_MESSAGE,
  REQUIRED_TEL_ERROR_MESSAGE,
  REQUIRED_AGE_ERROR_MESSAGE,
  TEL_ERROR_MESSAGE,
  AGE_ERROR_MESSAGE,
  ADDRESS_ERROR_MESSAGE,
} from '../helpers/constants';

const appointmentFormValidationSchema = Yup.object().shape({
  address: Yup.string()
    .trim()
    .required(REQUIRED_ADDRESS_MESSAGE)
    .matches(ADDRESS_REGEX, ADDRESS_ERROR_MESSAGE),

  tel: Yup.string()
    .trim()
    .required(REQUIRED_TEL_ERROR_MESSAGE)
    .matches(TEL_REGEX, TEL_ERROR_MESSAGE),

  age: Yup.string()
    .trim()
    .required(REQUIRED_AGE_ERROR_MESSAGE)
    .matches(AGE_REGEX, AGE_ERROR_MESSAGE),

  time: Yup.string()
    .matches(TIME_REGEX, REQUIRED_TIME_MESSAGE)
    .required(REQUIRED_TIME_MESSAGE),

  email: Yup.string()
    .trim()
    .required(REQUIRED_EMAIL_MESSAGE)
    .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),

  username: Yup.string()
    .trim()
    .required(REQUIRED_USER_NAME_MESSAGE)
    .matches(USER_NAME_REGEX, USER_NAME_ERROR_MESSAGE),

  comment: Yup.string()
    .trim()
    .required(REQUIRED_COMMENT_MESSAGE)
    .min(5, COMMENT_ERROR_MESSAGE),
});

export default appointmentFormValidationSchema;
