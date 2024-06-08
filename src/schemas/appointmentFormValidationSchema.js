import * as Yup from 'yup';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../helpers/regexPatterns';
import {
  USER_NAME_ERROR_MESSAGE,
  REQUIRED_USER_NAME_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
  REQUIRED_TIME_MESSAGE,
  COMMENT_ERROR_MESSAGE,
  REQUIRED_ADDRESS_MESSAGE,
  REQUIRED_TEL_ERROR_MESSAGE,
  REQUIRED_AGE_ERROR_MESSAGE,
} from '../helpers/constants';

//trim() ?

const appointmentFormValidationSchema = Yup.object().shape({
  address: Yup.string().matches().required(REQUIRED_ADDRESS_MESSAGE),

  tel: Yup.string().matches().required(REQUIRED_TEL_ERROR_MESSAGE),

  age: Yup.string().matches().required(REQUIRED_AGE_ERROR_MESSAGE),

  time: Yup.string().matches().required(REQUIRED_TIME_MESSAGE),

  email: Yup.string()
    .required(REQUIRED_EMAIL_MESSAGE)
    .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),

  username: Yup.string()
    .required(REQUIRED_USER_NAME_MESSAGE)
    .matches(USER_NAME_REGEX, USER_NAME_ERROR_MESSAGE),

  comment: Yup.string().min(5, COMMENT_ERROR_MESSAGE),
});

export default appointmentFormValidationSchema;
