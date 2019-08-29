/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
  noMarginTop?: boolean;
  noMarginBottom?: boolean;
}

export const H3: React.FC<IProps> = props => {
  return (
    <h3
      css={[
        styles.root,
        props.noMarginTop ? styles.noMarginTop : null,
        props.noMarginBottom ? styles.noMarginBottom : null,
      ]}
    >
      {props.children}
    </h3>
  );
};

const styles = {
  root: css`
    font-size: var(--FONT_SIZE_BASE);
    color: rgb(var(--TEXT_ACCENT));
    line-height: 1.25;
    font-weight: 400;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  `,

  noMarginTop: css`
    margin-top: 0;
  `,

  noMarginBottom: css`
    margin-bottom: 0;
  `,
};
