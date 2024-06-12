import { forwardRef } from 'react';
import s from './Textarea.module.css';

const Textarea = forwardRef(function Textarea(
  {
    form,
    name,
    placeholder,
    className,
    rows = '4',
    cols = '33',
    wrap = 'soft',
    ...rest
  },
  ref
) {
  const textareaClasses = `${s.textarea} ${s[className]}`;

  return (
    <textarea
      ref={ref}
      form={form}
      name={name}
      placeholder={placeholder}
      className={textareaClasses}
      rows={rows}
      cols={cols}
      wrap={wrap}
      {...rest}
    />
  );
});

export default Textarea;
