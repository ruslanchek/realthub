/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { H2 } from '../typographics/H2';

interface IProps {
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  customBody?: string | React.ReactNode;
}

export const Card: React.FC<IProps> = props => {
  return (
    <div css={styles.root}>
      {props.header && (
        <div css={styles.header}>
          <H2 noMarginBottom noMarginTop>
            {props.header}
          </H2>
        </div>
      )}
      {props.customBody ? (
        props.customBody
      ) : (
        <div css={styles.body}>{props.children}</div>
      )}
      {props.footer && <div css={styles.footer}>{props.footer}</div>}
    </div>
  );
};

const styles = {
  root: css`
    border-radius: var(--BORDER_RADIUS_LARGE);
    background-color: rgb(var(--ELEMENT_BG));
    box-shadow: var(--ELEVATION_SHADOW_3);
    display: flex;
    flex-direction: column;
  `,

  header: css`
    padding: 40px 40px 0;
  `,

  body: css`
    padding: 40px;
    flex-grow: 1;
  `,

  footer: css`
    border-top: 1px solid rgb(var(--ELEMENT_SEPARATOR));
    background-color: rgb(var(--ELEMENT_BG_ACCENT));
    border-radius: 0 0 var(--BORDER_RADIUS_LARGE) var(--BORDER_RADIUS_LARGE);
    padding: 20px;
  `,
};
