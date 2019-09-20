/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  rootContainerSelector: string;
}

interface IState {
  modals: Map<number, IModal>;
}

interface IModal {
  id: number;
  showOverlay: boolean;
  closeByEscapeKey: boolean;
  closeByEnterKey: boolean;
  closeByOutsideClick: boolean;
  onDidClose: () => void;
  onDidOpen: () => void;
  onWillClose: () => void;
  onWillOpen: () => void;
  renderModalComponent: () => React.ReactNode;
  show: boolean;
}

const ANIMATION_TIME: number = 200;
const BASE_Z: number = 1000;

export interface IModalContainerContext {
  openModal: (
    showOverlay: boolean,
    closeByEscapeKey: boolean,
    closeByEnterKey: boolean,
    closeByOutsideClick: boolean,
    onDidClose: () => void,
    onDidOpen: () => void,
    onWillClose: () => void,
    onWillOpen: () => void,
    renderModalComponent: () => React.ReactNode,
  ) => number;
  closeModal: (modalId: number) => void;
}

export const ModalContainerContext = React.createContext<
  IModalContainerContext
>({
  openModal: () => 0,
  closeModal: () => {},
});

export class ModalContainer extends React.Component<IProps, IState> {
  state = {
    modals: new Map<number, IModal>(),
  };

  root: HTMLDivElement | null = null;
  isMouseDown: boolean = false;
  topModalId: number | null = null;

  componentDidMount() {
    this.root = document.querySelector(this.props.rootContainerSelector);
    document.addEventListener('mousedown', this.handleOutsideClick, false);
    document.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleKeyUp = (e: KeyboardEvent) => {
    if (this.topModalId) {
      const modal = this.state.modals.get(this.topModalId);

      if (modal) {
        switch (e.keyCode) {
          // ESC
          case 27: {
            if (modal && modal.closeByEscapeKey) {
              this.closeModal(this.topModalId);
            }

            break;
          }

          // Return
          case 13: {
            if (modal && modal.closeByEnterKey) {
              this.closeModal(this.topModalId);
            }

            break;
          }
        }
      }
    }
  };

  render() {
    const { modals } = this.state;
    let isAnyModalOpened = false;
    let showOverlay = false;

    modals.forEach(modal => {
      if (modal.showOverlay) {
        showOverlay = true;
      }

      if (modal.show) {
        isAnyModalOpened = true;
      }
    });

    if (!isAnyModalOpened) {
      showOverlay = false;
    }

    return (
      <ModalContainerContext.Provider
        value={{
          closeModal: this.closeModal,
          openModal: this.openModal,
        }}
      >
        <React.Fragment>{this.props.children}</React.Fragment>

        {this.root &&
          ReactDOM.createPortal(
            <React.Fragment>
              {Array.from(modals.values()).map((modal, i) => {
                return (
                  <ClassNames key={modal.id}>
                    {({ css }) => {
                      return (
                        <CSSTransition
                          timeout={ANIMATION_TIME}
                          in={modal.show}
                          unmountOnExit
                          onExited={() => {
                            const { modals } = this.state;

                            modals.delete(modal.id);

                            this.setState({
                              modals,
                            });

                            modal.onDidClose();

                            if (modals.size > 0) {
                              this.topModalId = Array.from(
                                modals.values(),
                              ).sort((a, b) => b.id - a.id)[0].id;
                            } else {
                              this.topModalId = null;
                            }
                          }}
                          onEntered={() => {
                            modal.onDidOpen();
                          }}
                          classNames={{
                            enter: css(animationsModal.enter),
                            enterActive: css(animationsModal.enterActive),
                            exit: css(animationsModal.exit),
                            exitActive: css(animationsModal.exitActive),
                          }}
                        >
                          <div
                            onMouseDown={this.mouseDownHandler}
                            onMouseUp={this.mouseUpHandler}
                            css={[
                              styles.modal,
                              {
                                zIndex: BASE_Z + 1 + i,
                              },
                            ]}
                          >
                            {modal.renderModalComponent()}
                          </div>
                        </CSSTransition>
                      );
                    }}
                  </ClassNames>
                );
              })}

              <ClassNames>
                {({ css }) => {
                  return (
                    <CSSTransition
                      timeout={ANIMATION_TIME}
                      in={showOverlay}
                      unmountOnExit
                      classNames={{
                        enter: css(animationsOverlay.enter),
                        enterActive: css(animationsOverlay.enterActive),
                        exit: css(animationsOverlay.exit),
                        exitActive: css(animationsOverlay.exitActive),
                      }}
                    >
                      <div
                        css={[
                          styles.overlay,
                          {
                            zIndex: BASE_Z,
                          },
                        ]}
                      />
                    </CSSTransition>
                  );
                }}
              </ClassNames>
            </React.Fragment>,
            this.root,
          )}
      </ModalContainerContext.Provider>
    );
  }

  closeModal = (id: number) => {
    const { modals } = this.state;
    const modal = modals.get(id);

    if (modal) {
      modal.onWillClose();
      modals.set(id, { ...modal, ...{ show: false } });

      this.setState({
        modals,
      });
    }
  };

  openModal = (
    showOverlay: boolean,
    closeByEscapeKey: boolean,
    closeByEnterKey: boolean,
    closeByOutsideClick: boolean,
    onDidClose: () => void,
    onDidOpen: () => void,
    onWillClose: () => void,
    onWillOpen: () => void,
    renderModalComponent: () => React.ReactNode,
  ): number => {
    const { modals } = this.state;
    const id = Date.now();
    
    modals.set(id, {
      id,
      showOverlay,
      closeByEscapeKey,
      closeByEnterKey,
      closeByOutsideClick,
      onDidClose,
      onDidOpen,
      onWillClose,
      onWillOpen,
      renderModalComponent,
      show: false,
    });

    this.setState(
      {
        modals,
      },
      () => {
        const { modals } = this.state;
        const modal = modals.get(id);

        if (modal) {
          this.topModalId = id;

          modal.onWillOpen();
          modals.set(id, { ...modal, ...{ show: true } });

          this.setState({
            modals,
          });
        }
      },
    );

    return id;
  };

  mouseDownHandler = () => {
    this.isMouseDown = true;
  };

  mouseUpHandler = () => {
    this.isMouseDown = false;
  };

  handleOutsideClick = () => {
    if (this.isMouseDown || !this.topModalId) {
      return;
    }

    const modal = this.state.modals.get(this.topModalId);

    if (modal && modal.closeByOutsideClick) {
      this.closeModal(this.topModalId);
    }
  };
}

const animationsOverlay = {
  enter: css`
    opacity: 0;
  `,
  enterActive: css`
    opacity: 1;
    transition: opacity ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
  `,
  exitActive: css`
    opacity: 0;
    transition: opacity ${ANIMATION_TIME}ms;
  `,
};

const animationsModal = {
  enter: css`
    opacity: 0;
    transform: translate(-50%, -46%) !important;
  `,
  enterActive: css`
    opacity: 1;
    transform: translate(-50%, -50%) !important;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
    transform: translate(-50%, -50%) !important;
  `,
  exitActive: css`
    opacity: 0;
    transform: translate(-50%, -46%) !important;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
  `,
};

const styles = {
  root: css``,

  modal: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 0%;
    will-change: transform, opacity;
  `,

  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--BACKGROUND), 0.8);
    will-change: opacity;
  `,
};
