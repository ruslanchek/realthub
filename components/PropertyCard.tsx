/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { Love } from './Love';
import { IApiPropertyItem } from '../apis/ApiProperty';
import { UI_SIZES } from '../common/constants';
import React from 'react';

interface IProps {
  property: IApiPropertyItem;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export const PropertyCard = React.memo<IProps>(props => {
  const { property, focused, onFocus, onBlur } = props;
  const image = property.images[0];

  const handleOnMouseEnter = () => {
    onFocus();
  };

  const handleOnMouseLeave = () => {
    onBlur();
  };

  return (
    <div
      css={styles.root}
      className={focused ? 'focused' : ''}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="image">
        <Love enabled={false} styles={styles.love} />
        <img
          src={image.src}
          width={UI_SIZES.LIST_CARD_SIZE}
          height={UI_SIZES.LIST_CARD_SIZE}
          alt={image.title}
        />
      </div>
      <div className="info">
        <div className="price">
          ${property.sale ? property.sale : property.price}$
          {property.sale ? <span className="sale">Sale</span> : null}
        </div>
        <div className="title">{property.title}</div>
        <footer className="footer">
          <div className="address">
            {property.city} &bull; {property.address}
          </div>
          <div className="params">
            {property.params.map(param => (
              <span key={param.id}>
                {param.value} {param.type}
              </span>
            ))}
          </div>
        </footer>
      </div>
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
  root: css`
    background-color: white;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    margin: 15px;
    justify-content: flex-start;
    transition: box-shadow 0.2s;
    /* box-shadow: var(--ELEVATION_SHADOW_1); */
    border-radius: var(--BORDER_RADIUS_SMALL);
    flex-direction: row;

    &.focused {
      box-shadow: var(--ELEVATION_SHADOW_2);

      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 3px;
        height: 100%;
        flex-shrink: 0;
        right: 0;
        top: 0;
        opacity: 1;
        animation-name: ${focusedKeyframes};
        animation-duration: 0.2s;
        animation-fill-mode: backwards;
        background-color: rgb(var(--TEXT_ACTIVE));
      }
    }

    .info {
      padding: 15px;
    }

    .image {
      position: relative;

      > img {
        display: block;
        object-fit: cover;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-grow: 1;
    }

    .price {
      font-weight: 700;
      font-size: var(--FONT_SIZE_BASE);
      line-height: var(--FONT_SIZE_BASE);
      color: rgb(var(--TEXT_ACTIVE));
      display: flex;
      justify-content: space-between;

      > span {
        margin: 0 0 0 1ex;
      }
    }

    .sale {
      border: 1px solid #00cec9;
      padding: 1px 4px;
      border-radius: var(--BORDER_RADIUS_TINY);
      color: #00cec9;
      font-size: var(--FONT_SIZE_SMALL);
      text-transform: uppercase;
      font-weight: 600;
      justify-self: flex-end;
    }

    .title {
      font-weight: 700;
      margin-top: 0.4em;
    }

    .footer {
      justify-self: flex-end;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex-grow: 1;
    }

    .address {
      font-size: var(--FONT_SIZE_SMALL);
      margin-top: 1em;
      color: rgb(var(--TEXT_FADED));
    }

    .params {
      font-size: var(--FONT_SIZE_SMALL);
      font-weight: 500;
      margin-top: 1em;

      > span {
        margin-right: 1ex;
        background-color: rgb(var(--ELEMENT_BG_ACCENT));
        border-radius: var(--BORDER_RADIUS_TINY);
        padding: 3px 6px;
      }
    }
  `,

  love: css`
    position: absolute;
    top: 10px;
    right: 10px;
  `,
};
