/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { getCssVariableNumberMemoized } from '../../common/utils';

export type TTooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TTooltipAnchor = 'start' | 'middle' | 'end';

interface IProps {
  rootContainerSelector: string;
  position: TTooltipPosition;
  showOnHover: boolean;
  anchor: TTooltipAnchor;
  baseAnchor: TTooltipAnchor;
  renderBody: () => React.ReactNode;
  forceShow?: boolean;
  maxWidth?: number;
  offset?: number;
}

interface IState {
  x: number;
  y: number;
  isOpened: boolean;
  isAnimatedAndShowed: boolean;
}

const ANIMATION_TIME = 300;
const DEFAULT_MAX_WIDTH = 200;
const DEFAULT_OFFSET = 5;

export class Tooltip extends React.Component<IProps, IState> {
  state = {
    x: 0,
    y: 0,
    isOpened: false,
    isAnimatedAndShowed: false,
  };

  requestAnimationFrameTask: number | null = null;
  transformTimeout: NodeJS.Timeout | null = null;
  containerRoot: HTMLSpanElement | null = null;
  portalRoot: HTMLDivElement | null = document.querySelector(
    this.props.rootContainerSelector,
  );

  onMouseEnterHandler = () => {
    if (!this.props.forceShow) {
      this.getParentPosition();
      this.setState({
        isOpened: true,
      });
    }
  };

  onMouseLeaveHandler = () => {
    if (!this.props.forceShow) {
      this.setState({
        isOpened: false,
      });
    }
  };

  componentDidMount() {
    if (this.props.forceShow) {
      this.setState({
        isOpened: true,
      });
    }

    if (this.props.showOnHover && this.containerRoot) {
      this.containerRoot.addEventListener(
        'mouseenter',
        this.onMouseEnterHandler,
        false,
      );
      this.containerRoot.addEventListener(
        'mouseleave',
        this.onMouseLeaveHandler,
        false,
      );
    }

    this.getParentPosition();

    window.addEventListener('resize', this.getParentPosition, false);
    document.addEventListener('scroll', this.getParentPosition, true);
  }

  componentWillUnmount() {
    if (this.requestAnimationFrameTask) {
      cancelAnimationFrame(this.requestAnimationFrameTask);
    }

    window.removeEventListener('resize', this.getParentPosition, false);
    document.removeEventListener('scroll', this.getParentPosition, true);

    if (this.props.showOnHover && this.containerRoot) {
      this.containerRoot.removeEventListener(
        'mouseenter',
        this.onMouseEnterHandler,
        false,
      );
      this.containerRoot.removeEventListener(
        'mouseleave',
        this.onMouseLeaveHandler,
        false,
      );
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (
      nextProps.anchor !== this.props.anchor ||
      nextProps.baseAnchor !== this.props.baseAnchor ||
      nextProps.offset !== this.props.offset ||
      nextProps.maxWidth !== this.props.maxWidth ||
      nextProps.position !== this.props.position
    ) {
      this.getParentPosition();
    }

    if (nextProps.forceShow !== this.props.forceShow) {
      this.setState({
        isOpened: nextProps.forceShow === true,
      });
    }
  }

  getParentPosition = () => {
    if (this.containerRoot) {
      if (this.requestAnimationFrameTask) {
        cancelAnimationFrame(this.requestAnimationFrameTask);
      }

      this.requestAnimationFrameTask = requestAnimationFrame(() => {
        const parent: HTMLElement | null = this.containerRoot;
        const { baseAnchor } = this.props;
        const triangleWidth = getCssVariableNumberMemoized(
          '--TOOLTIP_TRIANGLE_WIDTH',
        );
        const borderRadius = getCssVariableNumberMemoized(
          '--BORDER_RADIUS_SMALL',
        );
        const cornerOffset = (triangleWidth + borderRadius) / 2;

        let offset = DEFAULT_OFFSET;

        if (this.props.offset || this.props.offset === 0) {
          offset = this.props.offset;
        }

        if (parent) {
          const boundingRect = parent.getBoundingClientRect();
          let x = 0;
          let y = 0;

          switch (this.props.position) {
            case 'top': {
              switch (baseAnchor) {
                case 'start': {
                  x = boundingRect.left + cornerOffset;
                  y = boundingRect.top - offset;
                  break;
                }

                case 'end': {
                  x = boundingRect.left + boundingRect.width - cornerOffset;
                  y = boundingRect.top - offset;
                  break;
                }

                case 'middle':
                default: {
                  x = boundingRect.left + boundingRect.width / 2;
                  y = boundingRect.top - offset;
                  break;
                }
              }

              break;
            }

            case 'bottom': {
              switch (baseAnchor) {
                case 'start': {
                  x = boundingRect.left + cornerOffset;
                  y = boundingRect.top + boundingRect.height + offset;
                  break;
                }

                case 'end': {
                  x = boundingRect.left + boundingRect.width - cornerOffset;
                  y = boundingRect.top + boundingRect.height + offset;
                  break;
                }

                case 'middle':
                default: {
                  x = boundingRect.left + boundingRect.width / 2;
                  y = boundingRect.top + boundingRect.height + offset;
                  break;
                }
              }

              break;
            }

            case 'left': {
              switch (baseAnchor) {
                case 'start': {
                  x = boundingRect.left - offset;
                  y = boundingRect.top + cornerOffset;
                  break;
                }

                case 'end': {
                  x = boundingRect.left - offset;
                  y = boundingRect.top + boundingRect.height - cornerOffset;
                  break;
                }

                case 'middle':
                default: {
                  x = boundingRect.left - offset;
                  y = boundingRect.top + boundingRect.height / 2;
                  break;
                }
              }

              break;
            }

            case 'right': {
              switch (baseAnchor) {
                case 'start': {
                  x = boundingRect.left + boundingRect.width + offset;
                  y = boundingRect.top + cornerOffset;
                  break;
                }

                case 'end': {
                  x = boundingRect.left + boundingRect.width + offset;
                  y = boundingRect.top + boundingRect.height - cornerOffset;
                  break;
                }

                case 'middle':
                default: {
                  x = boundingRect.left + boundingRect.width + offset;
                  y = boundingRect.top + boundingRect.height / 2;
                  break;
                }
              }

              break;
            }
          }

          this.setState({ x, y });
        }
      });
    }
  };

  render() {
    const { position, renderBody, maxWidth, children, anchor } = this.props;
    const { x, y, isOpened, isAnimatedAndShowed } = this.state;

    return (
      <span css={styles.root}>
        <span css={styles.rootInner} ref={ref => (this.containerRoot = ref)}>
          {this.portalRoot &&
            ReactDOM.createPortal(
              <ClassNames>
                {({ css }) => (
                  <CSSTransition
                    timeout={ANIMATION_TIME}
                    in={isOpened}
                    onEntered={() => {
                      this.setState({
                        isAnimatedAndShowed: true,
                      });
                    }}
                    onExited={() => {
                      this.setState({
                        isAnimatedAndShowed: false,
                      });
                    }}
                    unmountOnExit
                    mountOnEnter
                    classNames={{
                      enter: css(animations.enter),
                      enterActive: css(animations.enterActive),
                      exit: css(animations.exit),
                      exitActive: css(animations.exitActive),
                    }}
                  >
                    <span
                      className={`__${anchor}`}
                      css={[
                        styles.tooltip,
                        styles.positions[position],
                        isAnimatedAndShowed ? styles.transformAnimated : null,
                      ]}
                      style={{
                        maxWidth: `${
                          maxWidth ? maxWidth : DEFAULT_MAX_WIDTH
                        }px`,
                        left: x,
                        top: y,
                      }}
                    >
                      {renderBody()}
                    </span>
                  </CSSTransition>
                )}
              </ClassNames>,
              this.portalRoot,
            )}
          {children}
        </span>
      </span>
    );
  }
}

const animations = {
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

const styles = {
  root: css`
    line-height: 0;
  `,

  rootInner: css`
    display: inline-block;
  `,

  tooltip: css`
    position: fixed;
    font-size: var(--FONT_SIZE_SMALL);
    z-index: 50;
    border-radius: var(--BORDER_RADIUS_SMALL);
    background: rgb(var(--ELEMENT_BG));
    border: 1px solid rgb(var(--ELEMENT_BORDER));
    color: rgb(var(--TEXT));
    box-shadow: var(--ELEVATION_SHADOW_3);
    padding: 4px 10px;
    box-sizing: border-box;

    &:before,
    &:after {
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border: solid transparent;
    }
  `,

  transformAnimated: css`
    transition: transform 0.2s, left 0.2s, top 0.2s, right 0.2s, bottom 0.2s,
      margin 0.2s;

    &:before,
    &:after {
      transition: transform 0.2s, left 0.2s, top 0.2s, right 0.2s, bottom 0.2s,
        margin 0.2s;
    }
  `,

  positions: {
    top: css`
      transform: translate(-50%, calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH)));

      &:before,
      &:after {
        top: 100%;
        left: 50%;
      }

      &:before {
        border-color: transparent;
        border-top-color: rgb(var(--ELEMENT_BORDER));
        border-width: var(--TOOLTIP_TRIANGLE_WIDTH);
        margin-left: calc(var(--TOOLTIP_TRIANGLE_WIDTH) * -1);
      }

      &:after {
        border-color: transparent;
        border-top-color: rgb(var(--ELEMENT_BG));
        border-width: calc(var(--TOOLTIP_TRIANGLE_WIDTH) - 1px);
        margin-left: calc((var(--TOOLTIP_TRIANGLE_WIDTH) - 1px) * -1);
        transform: translateY(-0.5px);
      }

      &.__start {
        transform: translate(
          calc(
            (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)) * -1
          ),
          calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH))
        );

        &:before,
        &:after {
          top: 100%;
          left: calc(
            var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)
          );
        }
      }

      &.__end {
        transform: translate(
          calc(
            -100% + (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          ),
          calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH))
        );

        &:before,
        &:after {
          top: 100%;
          left: calc(
            100% - (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          );
        }
      }
    `,
    bottom: css`
      transform: translate(-50%, var(--TOOLTIP_TRIANGLE_WIDTH));

      &:before,
      &:after {
        bottom: 100%;
        left: 50%;
      }

      &:before {
        border-color: transparent;
        border-bottom-color: rgb(var(--ELEMENT_BORDER));
        border-width: var(--TOOLTIP_TRIANGLE_WIDTH);
        margin-left: calc(var(--TOOLTIP_TRIANGLE_WIDTH) * -1);
      }

      &:after {
        border-color: transparent;
        border-bottom-color: rgb(var(--ELEMENT_BG));
        border-width: calc(var(--TOOLTIP_TRIANGLE_WIDTH) - 1px);
        margin-left: calc((var(--TOOLTIP_TRIANGLE_WIDTH) - 1px) * -1);
        transform: translateY(0.5px);
      }

      &.__start {
        transform: translate(
          calc(
            (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)) * -1
          ),
          var(--TOOLTIP_TRIANGLE_WIDTH)
        );

        &:before,
        &:after {
          bottom: 100%;
          left: calc(
            var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)
          );
        }
      }

      &.__end {
        transform: translate(
          calc(
            -100% + (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          ),
          var(--TOOLTIP_TRIANGLE_WIDTH)
        );

        &:before,
        &:after {
          bottom: 100%;
          left: calc(
            100% - (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          );
        }
      }
    `,
    left: css`
      transform: translate(calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH)), -50%);

      &:before,
      &:after {
        left: 100%;
        top: 50%;
      }

      &:before {
        border-color: transparent;
        border-left-color: rgb(var(--ELEMENT_BORDER));
        border-width: var(--TOOLTIP_TRIANGLE_WIDTH);
        margin-top: calc(var(--TOOLTIP_TRIANGLE_WIDTH) * -1);
      }

      &:after {
        border-color: transparent;
        border-left-color: rgb(var(--ELEMENT_BG));
        border-width: calc(var(--TOOLTIP_TRIANGLE_WIDTH) - 1px);
        margin-top: calc((var(--TOOLTIP_TRIANGLE_WIDTH) - 1px) * -1);
        transform: translateX(-0.5px);
      }

      &.__start {
        transform: translate(
          calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH)),
          calc(
            (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)) * -1
          )
        );

        &:before,
        &:after {
          top: calc(var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH));
        }
      }

      &.__end {
        transform: translate(
          calc(-100% - var(--TOOLTIP_TRIANGLE_WIDTH)),
          calc(
            -100% + (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          )
        );

        &:before,
        &:after {
          top: calc(
            100% - (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          );
        }
      }
    `,
    right: css`
      transform: translate(var(--TOOLTIP_TRIANGLE_WIDTH), -50%);

      &:before,
      &:after {
        right: 100%;
        top: 50%;
      }

      &:before {
        border-color: transparent;
        border-right-color: rgb(var(--ELEMENT_BORDER));
        border-width: var(--TOOLTIP_TRIANGLE_WIDTH);
        margin-top: calc(var(--TOOLTIP_TRIANGLE_WIDTH) * -1);
      }

      &:after {
        border-color: transparent;
        border-right-color: rgb(var(--ELEMENT_BG));
        border-width: calc(var(--TOOLTIP_TRIANGLE_WIDTH) - 1px);
        margin-top: calc((var(--TOOLTIP_TRIANGLE_WIDTH) - 1px) * -1);
        transform: translateX(0.5px);
      }

      &.__start {
        transform: translate(
          var(--TOOLTIP_TRIANGLE_WIDTH),
          calc(
            (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH)) * -1
          )
        );

        &:before,
        &:after {
          top: calc(var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH));
        }
      }

      &.__end {
        transform: translate(
          var(--TOOLTIP_TRIANGLE_WIDTH),
          calc(
            -100% + (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          )
        );

        &:before,
        &:after {
          top: calc(
            100% - (var(--BORDER_RADIUS_SMALL) + var(--TOOLTIP_TRIANGLE_WIDTH))
          );
        }
      }
    `,
  },
};
