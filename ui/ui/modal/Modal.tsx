import React, { useContext, useRef, useEffect } from 'react';
import { ModalContainerContext } from './ModalContainer';

interface IProps {
  index?: 'auto' | number;
  closeByEscapeKey?: boolean;
  closeByEnterKey?: boolean;
  closeByOutsideClick?: boolean;
  showOverlay?: boolean;
  onReturnKey?: () => void;
  onWillClose?: () => void;
  onDidClose?: () => void;
  onWillOpen?: () => void;
  onDidOpen?: () => void;
}

export const Modal: React.FC<IProps> = props => {
  const modalContainerContext = useContext(ModalContainerContext);
  const id = useRef(-1);

  useEffect(() => {
    id.current = modalContainerContext.openModal(
      props.showOverlay as boolean,
      props.closeByEscapeKey as boolean,
      props.closeByEnterKey as boolean,
      props.closeByOutsideClick as boolean,
      props.onDidClose as () => void,
      props.onDidOpen as () => void,
      props.onWillClose as () => void,
      props.onWillOpen as () => void,
      () => props.children,
    );

    return () => {
      if (id.current !== null) {
        modalContainerContext.closeModal(id.current);
      }
    };
  }, []);

  return null;
};

Modal.defaultProps = {
  closeByEscapeKey: false,
  closeByEnterKey: false,
  closeByOutsideClick: false,
  showOverlay: false,
  onReturnKey: () => {},
  onWillClose: () => {},
  onDidClose: () => {},
  onWillOpen: () => {},
  onDidOpen: () => {},
};
