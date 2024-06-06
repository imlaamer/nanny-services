import s from './ErrorMessage.module.css';
const ErrorMessage = ({ touched, errorMessage, className }) => {
  return (
    // touched &&
    errorMessage && (
      <div className={`${s[className]} ${s.errorMessage}`}>{errorMessage}</div>
    )
  );
};
export default ErrorMessage;

// 'errorMessage',
