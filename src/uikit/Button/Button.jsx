import Spinner from '../../components/common/Spinner/Spinner';
import s from './Button.module.css';

const Button = ({
  type = 'button',
  title,
  children,
  className,
  onClick,
  loading,
  loaderColor = '#fff',
  id,
  disabled,
  ...rest
}) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      id={id}
      {...rest}
    >
      {isDisabled && <Spinner color={loaderColor} size="10px" />}
      {children}
      {!isDisabled && title}
    </button>
  );
};

export default Button;
