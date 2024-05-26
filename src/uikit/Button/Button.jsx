import Spinner from '../../components/common/Spinner/Spinner';

import s from './Button.module.css';

const Button = ({
  type = 'button',
  title,
  children,
  className = 'load-more',
  onClick,
  loading,
  loaderColor = '#fff',
  ...rest
}) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={loading}
      {...rest}
    >
      {loading && <Spinner color={loaderColor} />}
      {children}
      {!loading && title}
    </button>
  );
};

export default Button;
