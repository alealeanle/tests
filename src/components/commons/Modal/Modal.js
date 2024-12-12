import { memo } from 'react';
import PropTypes from 'prop-types';
import ModalFade from '@commons/ModalFade';
import s from './Modal.module.scss';

const Modal = ({ children, isOpen, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const contentClick = e => {
    e.stopPropagation();
  };

  return (
    <ModalFade isOpen={isOpen}>
      <div className={s.modal} onClick={handleCloseModal}>
        <div className={s.modalContent} onClick={contentClick}>
          <h2 className={s.title}>title</h2>
          {children}
        </div>
      </div>
    </ModalFade>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default memo(Modal);
