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
  ...rest
}) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={loading}
      id={id}
      {...rest}
    >
      {loading && <Spinner color={loaderColor} />}

      {!loading && title}
      {children}
    </button>
  );
};

export default Button;
