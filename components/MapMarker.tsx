/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { IApiPropertyItem } from '../apis/ApiProperty';
import { useState } from 'react';
import React from 'react';

interface IProps {
  property: IApiPropertyItem;
  lat: number;
  lng: number;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const SIZE = 16;

export const MapMarker = React.memo<IProps>(props => {
  const { property, focused, onFocus, onBlur } = props;

  const onMouseEnter = () => {
    onFocus();
  };

  const onMouseLeave = () => {
    onBlur();
  };

  return (
    <div
      css={styles.marker}
      className={focused ? 'focused' : ''}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <i className="dot" />
    </div>
  );
});

const styles = {
  marker: css`
    width: ${SIZE}px;
    height: ${SIZE}px;

    > i.dot {
      display: block;
      background-color: rgb(var(--TEXT_ACTIVE));
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 2px solid #fff;
      box-sizing: border-box;
      color: #fff;
      box-shadow: var(--ELEVATION_SHADOW_1);
      transition: transform 0.2s, background-color 0.2s;
      cursor: pointer;
      opacity: 1;
    }

    &.focused {
      > i.dot {
        transform: scale(1.3);
        background-color: hsl(var(--TEXT_ACTIVE_HSL_DARKEN));
      }
    }
  `,
};
