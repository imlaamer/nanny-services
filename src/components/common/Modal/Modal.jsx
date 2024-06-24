import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import s from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, children, className, isOpen }) => {
  const containerClassNames = `${s.container} ${s[className]}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  useEffect(() => {
    const onEscPress = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = 'scroll';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      document.body.style.overflow = 'scroll';
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={containerClassNames}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon id="x" width="32" height="32" />
        </button>

        <div className={s.content}>{children}</div>
      </div>
    </div>,
    modalRootRef
  );
};

export default Modal;
