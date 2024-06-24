import s from './ErrorMessage.module.css';

const ErrorMessage = ({ errorMessage, className }) => {
  return (
    errorMessage && (
      <div className={`${s[className]} ${s.errorMessage}`}>{errorMessage}</div>
    )
  );
};
export default ErrorMessage;

