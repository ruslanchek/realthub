/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { Love } from './Love';
import { IApiPropertyItem } from '../apis/ApiProperty';

export enum EViewSize {
  Large,
  Small,
}

interface IProps {
  property: IApiPropertyItem;
  viewSize: EViewSize;
  onPoint?: () => void;
}

export const PROPERTY_CARD_IMAGE_SIZES: {
  [key: number]: { width: number; height: number };
} = {
  [EViewSize.Large]: {
    width: 300,
    height: 250,
  },

  [EViewSize.Small]: {
    width: 250,
    height: 208,
  },
};

export const PropertyCard: React.FC<IProps> = props => {
  const { property, viewSize: viewSize, onPoint } = props;
  const image = property.images[0];
  const [isFocused, setIsFocused] = useState(false);

  const handleOnMouseEnter = () => {
    setIsFocused(true);

    if (onPoint) {
      onPoint();
    }
  };

  const handleOnMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <div
      css={[styles.root, styles.rootView[viewSize]]}
      className={isFocused ? 'focused' : ''}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="image">
        <Love enabled={false} styles={styles.love} />
        <img
          src={image.src}
          width={PROPERTY_CARD_IMAGE_SIZES[viewSize].width}
          height={PROPERTY_CARD_IMAGE_SIZES[viewSize].height}
          alt={image.title}
        />
      </div>
      <div className="info">
        <div className="price">${property.price}</div>
        <div className="title">{property.title}</div>
        <footer className="footer">
          <div className="address">{property.address}</div>
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
};

const styles = {
  root: css`
    background-color: white;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    transition: box-shadow 0.2s;

    .image {
      position: relative;

      > img {
        display: block;
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
        background-color: rgba(var(--TEXT), 0.075);
        border-radius: 4px;
        padding: 3px 6px;
      }
    }
  `,

  rootView: {
    [EViewSize.Large]: css`
      width: ${PROPERTY_CARD_IMAGE_SIZES[EViewSize.Large].width}px;
      margin: 0 20px 45px;
      box-shadow: 0px 20px 25px rgba(175, 175, 175, 0.16),
        0px 10px 10px rgba(0, 0, 0, 0.04);
      border-radius: var(--BORDER_RADIUS_LARGE);
      flex-direction: column;

      &.focused {
        box-shadow: 0px 20px 25px rgba(175, 175, 175, 0.16),
          0px 10px 10px rgba(0, 0, 0, 0.04);
      }

      .info {
        padding: 20px;
      }
    `,

    [EViewSize.Small]: css`
      margin: 20px;
      box-shadow: 0px 2px 5px rgba(175, 175, 175, 0.2),
        0px 5px 5px rgba(0, 0, 0, 0.04);
      border-radius: var(--BORDER_RADIUS_TINY);
      flex-direction: row;

      &.focused {
        box-shadow: 0px 4px 15px rgba(175, 175, 175, 0.2),
          0px 10px 10px rgba(0, 0, 0, 0.04);
      }

      .info {
        padding: 15px;
      }
    `,
  },

  love: css`
    position: absolute;
    top: 10px;
    right: 10px;
  `,
};
