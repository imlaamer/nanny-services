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
      // disabled={isDisabled}
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

{
  /* НЕ працює спінер по такій умові хоча  loading стає тру */
}

{
  /* {loading && <Spinner />}
      {children}
      {!loading && title} */
}
{
  /* {(loading || disabled) && <Spinner color="#fff" width="10" heigh="10" />} */
}
{
  /* {!loading && !|| disabled && title} */
}
