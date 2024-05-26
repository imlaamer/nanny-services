import * as Yup from 'yup';
import { EMAIL_REGEX, NAME_REGEX } from '../helpers/regexPatterns.js';
import {
  NAME_ERROR_MESSAGE,
  REQUIRED_NAME_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
} from '../helpers/constants.js';

export const bookingFormSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .matches(NAME_REGEX, NAME_ERROR_MESSAGE)
    .required(REQUIRED_NAME_MESSAGE),

  email: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE)
    .required(REQUIRED_EMAIL_MESSAGE),
});
