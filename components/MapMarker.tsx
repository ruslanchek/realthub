/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { IApiPropertyItem } from '../apis/ApiProperty';
import { useState } from 'react';
import React from 'react';
import { Tooltip } from '../ui/module';
import { UI_CONFIG, UI_SIZES } from '../common/constants';

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
  const image = property.images[0];

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
      {focused && (
        <div className="card">
          <div className="image">
            <img
              src={image.src}
              width={UI_SIZES.MARKER_IMAGE_SIZE}
              height={UI_SIZES.MARKER_IMAGE_SIZE * UI_SIZES.IMAGE_HEIGHT_RATIO}
              alt={image.title}
            />
          </div>

          <div className="info">
            <div className="price">
              ${property.sale ? property.sale : property.price}$
              {property.sale ? <span className="sale">Sale</span> : null}
            </div>
            <div className="title">{property.title}</div>
          </div>
        </div>
      )}
      <i className="dot" />
    </div>
  );
});

const focusedKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const styles = {
  marker: css`
    width: ${SIZE}px;
    height: ${SIZE}px;
    transform: translate(-50%, -50%);
    font-family: var(--FONT_FAMILY);
    line-height: var(--GLOBAL_LINE_HEIGHT);
    font-size: var(--FONT_SIZE_SMALL);

    > i.dot {
      content: '';
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

    .card {
      background-color: white;
      flex-shrink: 0;
      position: relative;
      display: flex;
      justify-content: flex-start;
      box-shadow: var(--ELEVATION_SHADOW_1);
      border-radius: var(--BORDER_RADIUS_SMALL);
      flex-direction: row;
      position: absolute;
      width: 320px;
      opacity: 1;
      animation-name: ${focusedKeyframes};
      animation-duration: 0.2s;
      animation-fill-mode: backwards;
      transform: translate(-50%, calc(-100% - 10px));
      top: 0;
      left: 50%;

      &:after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        bottom: -6px;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        border-style: solid;
        border-width: 6px 5px 0 5px;
        border-color: white transparent transparent transparent;
      }

      .image {
        flex-shrink: 0;
        overflow: hidden;
        border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);

        > img {
          display: block;
        }
      }

      .info {
        padding: 10px;

        .price {
          font-weight: 700;
          color: rgb(var(--TEXT_ACTIVE));
          display: flex;

          > span {
            margin: 0 0 0 1ex;
          }

          .sale {
            color: rgb(var(--BUTTON_SUCCESS));
            text-transform: uppercase;
            font-weight: 700;
            margin-left: 1ex;
            font-size: var(--FONT_SIZE_SMALL);
          }
        }
      }
    }

    &.focused {
      > i.dot {
        transform: scale(1.3);
        background-color: hsl(var(--TEXT_ACTIVE_HSL_DARKEN));
      }
    }
  `,
};
