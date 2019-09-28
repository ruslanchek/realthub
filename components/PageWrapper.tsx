/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { GlobalStyles } from '../ui/module';
import { UI_CONFIG, UI_THEME } from '../common/constants';

export const PageWrapper: React.FC = props => {
  return (
    <div css={styles.root}>
      <Global styles={styles.global} />
      <GlobalStyles theme={UI_THEME} />
      {props.children}
      <div id={UI_CONFIG.MODALS_PORTAL_ROOT_ID} />
      <div id={UI_CONFIG.NOTIFICATIONS_PORTAL_ROOT_ID} />
      <div id={UI_CONFIG.TOOLTIPS_PORTAL_ROOT_ID} />
    </div>
  );
};

const styles = {
  root: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  `,

  global: css``,
};
