/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { ActivityIndicator } from '../loading/ActivityIndicator';
import { Icon, EIconName } from '../icons/icons';

interface IProps {
  type?: 'submit' | 'button';
  size?: 'small' | 'large' | 'tiny';
  color?:
    | 'default'
    | 'success'
    | 'accent'
    | 'faded'
    | 'danger'
    | 'facebook'
    | 'google';
  disabled?: boolean;
  loading?: boolean;
  icon?: EIconName | undefined;
  tabIndex?: number;
  onClick?: () => void;
}

export const Button: React.FC<IProps> = props => {
  const {
    type,
    size,
    color,
    disabled,
    loading,
    icon,
    onClick,
    children,
    tabIndex,
  } = props;

  const [isFocusMarked, setFocusMarked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      tabIndex={tabIndex || 1}
      className={isFocusMarked ? 'focus' : ''}
      onKeyUp={() => {
        setFocusMarked(true);
      }}
      onBlur={() => {
        setFocusMarked(false);
      }}
      onMouseDown={() => {
        setFocusMarked(false);
      }}
      css={[
        styles.root,
        styles.sizes[size || 'large'],
        styles.colors[color || 'default'],
      ]}
      onClick={handleClick}
    >
      {icon !== undefined ? (
        <span css={styles.icon}>
          <Icon
            width="18px"
            height="18px"
            color={'rgb(var(--TEXT_ACCENT))'}
            name={icon}
          />
        </span>
      ) : null}

      {loading ? (
        <ActivityIndicator size="small" color={'rgb(var(--TEXT_ACCENT))'} />
      ) : (
        children
      )}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  size: 'large',
  color: 'default',
  disabled: false,
  loading: false,
  icon: undefined,
  tabIndex: 1,
  onClick: () => {},
};

const styles = {
  root: css`
    padding: 0 calc(var(--INPUT_SIDE_PADDING) * 1.5);
    font-family: var(--FONT_FAMILY);
    border: none;
    background: none;
    outline: none;
    display: flex;
    justify-content: center;
    user-select: none;
    align-items: center;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-appearance: none;
    color: rgb(var(--BUTTON_TEXT));
    font-size: var(--FONT_SIZE_BASE);
    box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
    transform: scale(0.99999);
    border-radius: var(--BORDER_RADIUS_SMALL);

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  `,

  icon: css`
    position: relative;
    top: 1.5px;
    margin: 0 8px 0 -8px;
  `,

  colors: {
    default: css`
      background-color: rgb(var(--BUTTON_DEFAULT));

      &:hover {
        background-color: hsl(var(--BUTTON_DEFAULT_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_DEFAULT_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_DEFAULT));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_DEFAULT_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33),
            0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
        }
      }
    `,

    success: css`
      background-color: rgb(var(--BUTTON_SUCCESS));

      &:hover {
        background-color: hsl(var(--BUTTON_SUCCESS_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_SUCCESS_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_SUCCESS), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_SUCCESS));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_SUCCESS), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_SUCCESS_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_SUCCESS), 0.33),
            0 0 0 0 rgba(var(--BUTTON_SUCCESS), 0);
        }
      }
    `,

    accent: css`
      background-color: rgb(var(--BUTTON_ACCENT));

      &:hover {
        background-color: hsl(var(--BUTTON_ACCENT_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_ACCENT_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_ACCENT));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_ACCENT), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_ACCENT_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_ACCENT), 0.33),
            0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
        }
      }
    `,

    faded: css`
      background-color: rgb(var(--BUTTON_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_FADED_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FADED_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FADED), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FADED));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_FADED), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FADED_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_FADED), 0.33),
            0 0 0 0 rgba(var(--BUTTON_FADED), 0);
        }
      }
    `,

    danger: css`
      background-color: rgb(var(--BUTTON_DANGER));

      &:hover {
        background-color: hsl(var(--BUTTON_DANGER_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_DANGER));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DANGER), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DANGER), 0.33),
            0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
        }
      }
    `,

    facebook: css`
      background-color: rgb(var(--BUTTON_FACEBOOK));

      &:hover {
        background-color: hsl(var(--BUTTON_FACEBOOK_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FACEBOOK_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FACEBOOK));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_FACEBOOK), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FACEBOOK_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_FACEBOOK), 0.33),
            0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
        }
      }
    `,

    google: css`
      background-color: rgb(var(--BUTTON_GOOGLE));
      color: rgb(var(--TEXT_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_GOOGLE_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_GOOGLE_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_GOOGLE));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_GOOGLE), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_GOOGLE_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_GOOGLE), 0.33),
            0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
        }
      }
    `,
  },

  sizes: {
    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
    `,

    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
    `,

    tiny: css`
      height: var(--INPUT_HEIGHT_TINY);
      font-size: var(--FONT_SIZE_SMALL);
    `,
  },
};
