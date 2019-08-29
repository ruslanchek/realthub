/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import {
  IModalContainerContext,
  ModalContainerContext,
} from './ModalContainer';

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

export class Modal extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
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

  modalContainerContext: IModalContainerContext | null = null;
  isMouseDown: boolean = false;
  id: number | null = null;

  componentWillUnmount() {
    if (this.modalContainerContext && this.id !== null) {
      this.modalContainerContext.closeModal(this.id);
    }
  }

  componentDidMount() {
    if (this.modalContainerContext) {
      this.id = this.modalContainerContext.openModal(
        this.props.showOverlay as boolean,
        this.props.closeByEscapeKey as boolean,
        this.props.closeByEnterKey as boolean,
        this.props.closeByOutsideClick as boolean,
        this.props.onDidClose as () => void,
        this.props.onDidOpen as () => void,
        this.props.onWillClose as () => void,
        this.props.onWillOpen as () => void,
        this.props.children,
      );
    }
  }

  render() {
    return (
      <ModalContainerContext.Consumer>
        {context => {
          if (!this.modalContainerContext) {
            this.modalContainerContext = context;
          }

          return null;
        }}
      </ModalContainerContext.Consumer>
    );
  }
}
