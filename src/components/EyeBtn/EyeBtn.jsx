import { useState } from 'react';
import Icon from '../common/Icon/Icon';

import s from './EyeBtn.module.css';

const EyeBtn = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);

  const handleToggleEye = (e) => {
    if (isOpenEye) {
      setIsOpenEye(false);
      e.currentTarget.previousElementSibling.type = 'password';
    }
    if (!isOpenEye) {
      setIsOpenEye(true);
      e.currentTarget.previousElementSibling.type = 'text';
    }
  };
  return (
    <>
      <button type="button" className={s.eyeBtn} onClick={handleToggleEye}>
        {!isOpenEye ? <Icon id={'eye-close'} /> : <Icon id={'eye-open'} />}
      </button>
    </>
  );
};
export default EyeBtn;
