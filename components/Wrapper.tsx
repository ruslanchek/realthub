/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { GlobalStyles, themeLight, ITheme } from '../ui/module';
import Color from 'color';

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

    BORDER_RADIUS_LARGE: '15px',
    BORDER_RADIUS_SMALL: '10px',
    BORDER_RADIUS_TINY: '5px',
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
    <main css={styles.root}>
      <Global styles={styles.global} />
      <GlobalStyles theme={theme} />
      {props.children}
    </main>
  );
};

const styles = {
  root: css``,

  global: css``,
};
