/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { GlobalStyles, themeLight, ITheme } from '../ui/module';
import Color from 'color';
import { CONFIG } from '../config';

const theme: ITheme = {
  BREAKPOINTS: {
    ...themeLight.BREAKPOINTS,
  },

  CONSTANTS: {
    ...themeLight.CONSTANTS,
    FONT_FAMILY: "'Fira Sans', sans-serif",
    GLOBAL_LINE_HEIGHT: '1.3',

    FONT_SIZE_BASE: '17px',
    FONT_SIZE_MEDIUM: '19px',
    FONT_SIZE_LARGE: '25px',
    FONT_SIZE_SMALL: '14px',

    BORDER_RADIUS_LARGE: '10px',
    BORDER_RADIUS_SMALL: '6px',
    BORDER_RADIUS_TINY: '4px',
  },

  COLORS: {
    ...themeLight.COLORS,
    TEXT_ACTIVE: Color('#4055ec'),
    TEXT: Color('#243857'),

    BUTTON_DEFAULT: Color('#4055ec'),
  },
};

export const Wrapper: React.FC = props => {
  return (
    <div css={styles.root}>
      <Global styles={styles.global} />
      <GlobalStyles theme={theme} />
      {props.children}
      <div id={CONFIG.MODALS_PORTAL_ROOT_ID} />
      <div id={CONFIG.NOTIFICATIONS_PORTAL_ROOT_ID} />
      <div id={CONFIG.TOOLTIPS_PORTAL_ROOT_ID} />
    </div>
  );
};

const styles = {
  root: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,

  global: css``,
};
