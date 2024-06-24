import { useState } from 'react';
import Icon from '../common/Icon/Icon';

import s from './EyeBtn.module.css';

const EyeBtn = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);

  const handleToggleEye = (e) => {
    setIsOpenEye(!isOpenEye);
    if (isOpenEye) {
      e.currentTarget.previousElementSibling.type = 'password';
    } else {
      e.currentTarget.previousElementSibling.type = 'text';
    }
  };
  return (
    <button type="button" className={s.eyeBtn} onClick={handleToggleEye}>
      <Icon id={!isOpenEye ? 'eye-close' : 'eye-open'} />
    </button>
  );
};
export default EyeBtn;
