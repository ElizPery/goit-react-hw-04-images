import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = (e) => {
        if (e.code === 'Escape') {
        this.props.onClose();
        }
    } 

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
      return createPortal(
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.modal}>
            {this.props.children}
          </div>
          </div>,
          modalRoot
      );   
    }
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}