/** @jsx jsx */
import { jsx, ClassNames, css } from '@emotion/core';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';

export enum ENotificationType {
  Default,
  Faded,
  Success,
  Accent,
  Danger,
}

interface IProps {
  rootContainerSelector: string;
  verticalOffset: string;
  horizontalOffset: string;
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
  width: string;
  allowIdentical?: boolean;
}

interface IState {
  notifications: Map<number, INotification>;
}

interface INotification {
  id: number;
  type: ENotificationType;
  title: string | React.ReactNode;
  body: string | React.ReactNode;
  timeout: NodeJS.Timeout | null;
  show: boolean;
}

const DEFAULT_LIFETIME: number = 5000;
const ANIMATION_TIME: number = 300;
const Z_INDEX: number = 3000;
const MAX_HEIGHT: number = 300;

export class NotificationsContainer extends React.Component<IProps, IState> {
  state = {
    notifications: new Map<number, INotification>(),
  };

  root: HTMLDivElement | null = document.querySelector(
    this.props.rootContainerSelector,
  );

  public clearAll() {
    this.state.notifications.forEach(notification => {
      if (notification.timeout) {
        clearTimeout(notification.timeout);
      }
    });

    this.setState({
      notifications: new Map(),
    });
  }

  private getId(value: string): number {
    if (this.props.allowIdentical) {
      return Date.now();
    }

    let hash = 0;

    if (value.length === 0) {
      return hash;
    }

    for (let i = 0, l = value.length; i < l; i++) {
      let chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }

    if (hash < 0) {
      return -hash;
    } else {
      return hash;
    }
  }

  public addNotification(
    type: ENotificationType,
    body: string | React.ReactNode,
    title?: string | React.ReactNode,
    lifetime?: number,
  ): number | null {
    const { notifications } = this.state;
    const id = this.getId(`${type.toString()}${body}${title}`);

    if (!this.props.allowIdentical && notifications.get(id)) {
      return null;
    }

    notifications.set(id, {
      id,
      body,
      type,
      title: title || null,
      timeout: null,
      show: false,
    });

    this.setState({ notifications }, () => {
      const notification = this.state.notifications.get(id);

      if (notification) {
        if (!lifetime) {
          lifetime = DEFAULT_LIFETIME;
        }

        lifetime += ANIMATION_TIME;

        notification.timeout = setTimeout(() => {
          this.removeNotification(id);
        }, lifetime);

        notification.show = true;

        const { notifications } = this.state;

        notifications.set(id, notification);

        this.setState({ notifications });
      }
    });

    return id;
  }

  public removeNotification(id: number) {
    const { notifications } = this.state;
    const notification = notifications.get(id);

    if (notification) {
      notifications.set(id, { ...notification, ...{ show: false } });

      this.setState({ notifications }, () => {
        if (notification.timeout) {
          clearTimeout(notification.timeout);
        }
      });
    }
  }

  get rootTop(): string {
    if (this.props.verticalPosition === 'top') {
      return this.props.verticalOffset;
    } else {
      return 'auto';
    }
  }

  get rootBottom(): string {
    if (this.props.verticalPosition === 'bottom') {
      return this.props.verticalOffset;
    } else {
      return 'auto';
    }
  }

  get rootLeft(): string {
    if (this.props.horizontalPosition === 'left') {
      return '0';
    } else if (this.props.horizontalPosition === 'center') {
      return '50%';
    } else {
      return 'auto';
    }
  }

  get rootRight(): string {
    if (this.props.horizontalPosition === 'left') {
      return 'auto';
    } else if (this.props.horizontalPosition === 'right') {
      return '0';
    } else {
      return 'auto';
    }
  }

  get translateX(): string {
    if (this.props.horizontalPosition === 'left') {
      return this.props.horizontalOffset;
    } else if (this.props.horizontalPosition === 'right') {
      return `-${this.props.horizontalOffset}`;
    } else {
      return '-50%';
    }
  }

  get translateY(): string {
    if (this.props.verticalPosition === 'top') {
      return this.props.verticalOffset;
    } else {
      return `-${this.props.verticalOffset}`;
    }
  }

  render() {
    if (!this.root) {
      return null;
    }

    const { notifications } = this.state;
    const { verticalOffset, horizontalPosition, width } = this.props;
    let alignSelf = '';

    if (horizontalPosition === 'left') {
      alignSelf = 'flex-start';
    } else if (horizontalPosition === 'right') {
      alignSelf = 'flex-end';
    } else {
      alignSelf = 'center';
    }

    return ReactDOM.createPortal(
      <React.Fragment>
        {notifications.size > 0 && (
          <div
            css={[
              styles.root,
              css`
                width: ${width}px;
                top: ${this.rootTop};
                bottom: ${this.rootBottom};
                left: ${this.rootLeft};
                right: ${this.rootRight};
                transform: translate(${this.translateX}, ${this.translateY});
                max-height: calc(100vh - ${verticalOffset});
              `,
            ]}
          >
            {Array.from(notifications.values()).map(notification => {
              return (
                <ClassNames key={notification.id}>
                  {({ css }) => {
                    return (
                      <CSSTransition
                        timeout={ANIMATION_TIME}
                        in={notification.show}
                        unmountOnExit
                        onExited={() => {
                          const { notifications } = this.state;
                          notifications.delete(notification.id);
                          this.setState({ notifications });
                        }}
                        classNames={{
                          enter: css(animations.enter),
                          enterActive: css(animations.enterActive),
                          exit: css(animations.exit),
                          exitActive: css(animations.exitActive),
                        }}
                      >
                        <div
                          css={[
                            styles.notification,
                            {
                              maxWidth: width,
                              alignSelf,
                            },
                          ]}
                          onClick={() => {
                            this.removeNotification(notification.id);
                          }}
                        >
                          <div
                            css={[
                              styles.container,
                              styles.containerTypes[notification.type],
                            ]}
                          >
                            {notification.title && (
                              <div css={styles.title}>{notification.title}</div>
                            )}
                            <div css={styles.body}>{notification.body}</div>
                          </div>
                        </div>
                      </CSSTransition>
                    );
                  }}
                </ClassNames>
              );
            })}
          </div>
        )}
      </React.Fragment>,
      this.root,
    );
  }
}

const animations = {
  enter: css`
    opacity: 0;
    transform: scale(0.95);
    max-height: 0;
  `,
  enterActive: css`
    opacity: 1;
    transform: scale(1);
    max-height: ${MAX_HEIGHT}px;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms,
      max-height ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
    transform: scale(1);
    max-height: ${MAX_HEIGHT}px;
  `,
  exitActive: css`
    opacity: 0;
    transform: scale(0.95);
    max-height: 0;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms,
      max-height ${ANIMATION_TIME}ms;
  `,
};

const styles = {
  root: css`
    position: fixed;
    z-index: ${Z_INDEX};
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px 10px;
  `,

  notification: css`
    will-change: transform, opacity, max-height;
    user-select: none;
    flex-shrink: 1;

    &:before {
      content: '';
      display: block;
      height: 10px;
    }
  `,

  container: css`
    padding: 10px 15px;
    border-radius: var(--BORDER_RADIUS_LARGE);
    cursor: pointer;
    box-shadow: var(--ELEVATION_SHADOW_2);
    transition: background-color 0.2s;
  `,

  containerTypes: {
    [ENotificationType.Default]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_DEFAULT));

      &:hover {
        background-color: hsl(var(--BUTTON_DEFAULT_HSL_DARKEN));
      }
    `,
    [ENotificationType.Faded]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_FADED_HSL_DARKEN));
      }
    `,
    [ENotificationType.Accent]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_ACCENT));

      &:hover {
        background-color: hsl(var(--BUTTON_ACCENT_HSL_DARKEN));
      }
    `,
    [ENotificationType.Danger]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_DANGER));

      &:hover {
        background-color: hsl(var(--BUTTON_DANGER_HSL_DARKEN));
      }
    `,
    [ENotificationType.Success]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_SUCCESS));

      &:hover {
        background-color: hsl(var(--BUTTON_SUCCESS_HSL_DARKEN));
      }
    `,
  },

  title: css`
    font-weight: 600;
  `,

  body: css`
    opacity: 0.75;
  `,
};
