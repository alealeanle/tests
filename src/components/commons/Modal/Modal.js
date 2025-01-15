import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import useEscapeKey from '@hooks/useEscapeKey';
import ModalFade from './ModalFade';
import s from './Modal.module.scss';

const Modal = ({ title, children, isOpen, setIsModalOpen, setOther }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modalOpen');
    } else {
      document.body.classList.remove('modalOpen');
    }

    return () => {
      document.body.classList.remove('modalOpen');
    };
  }, [isOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (setOther) {
      setOther();
    }
  };

  useEscapeKey(handleCloseModal);

  const contentClick = e => {
    e.stopPropagation();
  };

  return (
    <ModalFade isOpen={isOpen}>
      <div className={s.modal} onClick={handleCloseModal}>
        <div className={s.modalContent} onClick={contentClick}>
          <div className={s.header}>
            <h2 className={s.title}>{title}</h2>
            <button
              type="button"
              className={s.close}
              onClick={handleCloseModal}
            >
              ⨉
            </button>
          </div>
          <div className={s.children}>{children}</div>
        </div>
      </div>
    </ModalFade>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setOther: PropTypes.func,
};

export default memo(Modal);
