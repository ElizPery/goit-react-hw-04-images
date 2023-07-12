import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {

    useEffect(() => {
        const handleKeydown = e => {
          if (e.code === 'Escape') {
            onClose();
          }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [onClose])

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) onClose();
    }

    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>
          {children}
        </div>
      </div>,
      modalRoot
    );   
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}