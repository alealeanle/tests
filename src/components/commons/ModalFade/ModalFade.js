import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import s from './ModalFade.module.scss';

const ModalFade = ({ children, isOpen }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames={{
        enter: s['fade-enter'],
        enterActive: s['fade-enter-active'],
        exit: s['fade-exit'],
        exitActive: s['fade-exit-active'],
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

ModalFade.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default memo(ModalFade);
