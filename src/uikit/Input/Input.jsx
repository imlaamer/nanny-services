import { forwardRef } from 'react';
import s from './Input.module.css';

// const Input = ({ type, name, placeholder, className, ...rest }) => {
//   const inputClasses = `${s.input} ${s[className]}`;

//   return (
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       className={inputClasses}
//       {...rest}
//     />
//   );
// };

// export default Input;

const Input = forwardRef(function Input(
  { type, name, placeholder, className, ...rest },
  ref
) {
  const inputClasses = `${s.input} ${s[className]}`;

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      className={inputClasses}
      {...rest}
    />
  );
});

export default Input;
