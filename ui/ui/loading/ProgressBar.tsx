/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import React from 'react';

interface IProps {
  animated?: boolean;
  progress?: number;
}

export const ProgressBar: React.FC<IProps> = props => {
  let width: number = 100;

  if (props.progress && (props.progress >= 0 && props.progress <= 100)) {
    width = props.progress;
  }

  return (
    <div css={[styles.root, props.animated ? styles.animated : null]}>
      <i style={{ width: `${width}%` }} />
    </div>
  );
};

const animation = keyframes`
	from {
		background-position-x: 0;
	}

	to {
		background-position-x: 25px;
	}
`;

const styles = {
  root: css`
    max-width: 150px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.18);
    background-color: rgb(var(--ELEMENT_BG_ACCENT));

    > i {
      display: block;
      height: 10px;
      border-radius: 5px;
      background-color: rgb(var(--BUTTON_DEFAULT));
      transition: width 0.1s linear;
    }
  `,

  animated: css`
    > i {
      background-image: url('data:image/png;base64,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');
      background-size: 25px;
      animation-name: ${animation};
      animation-duration: 0.25s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  `,
};
