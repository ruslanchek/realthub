/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { ITheme } from '../../common/theme';

interface IProps {
  theme: ITheme;
}

export const GlobalStyles: React.FC<IProps> = props => {
  const colors: string[] = [];
  const constants: string[] = [];
  const breakpoints: string[] = [];

  for (const color in props.theme.COLORS) {
    const rgb = (props.theme.COLORS as any)[color];
    const lighten = rgb.lighten(0.1).array();
    const darken = rgb.darken(0.1).array();

    colors.push(
      `--${color}: ${rgb.array().join(',')}`,
      `--${color}_HSL_LIGHTEN: ${lighten[0]},${lighten[1]}%,${lighten[2]}%`,
      `--${color}_HSL_DARKEN: ${darken[0]},${darken[1]}%,${darken[2]}%`,
    );
  }

  for (const constant in props.theme.CONSTANTS) {
    constants.push(
      `--${constant}: ${(props.theme.CONSTANTS as any)[constant]}`,
    );
  }

  for (const breakpoint in props.theme.BREAKPOINTS) {
    breakpoints.push(
      `--${breakpoint}: ${(props.theme.BREAKPOINTS as any)[breakpoint]}px`,
    );
  }

  return (
    <Global
      styles={[
        styles,
        css`
          :root {
            ${colors.join(';')};
            ${constants.join(';')};
            ${breakpoints.join(';')};
          }
        `,
      ]}
    />
  );
};

const styles = css`
  body {
    font-family: var(--FONT_FAMILY);
    margin: 0;
    background-color: rgb(var(--BACKGROUND));
    color: rgb(var(--TEXT));
    font-size: var(--FONT_SIZE_BASE);
    line-height: var(--GLOBAL_LINE_HEIGHT);
  }

  a,
  a:link,
  a:visited {
    color: rgb(var(--TEXT_ACTIVE));
    text-decoration: none;
    outline: none;
  }

  a:hover,
  a:active {
    color: rgb(var(--TEXT_ACTIVE_INTERACTED));
  }

  a:focus {
    color: rgb(var(--TEXT_ACTIVE_INTERACTED));
  }

  ul,
  ol {
    padding-left: 2.35ex;
  }

  p {
    margin-top: 0;
  }

  ::placeholder {
    color: rgb(var(--PLACEHOLDER));
  }

  ::selection {
    background: rgb(var(--INPUT_BORDER_ACTIVE));
    color: rgb(var(--BUTTON_TEXT));
  }

  ::-moz-selection {
    background: rgb(var(--INPUT_BORDER_ACTIVE));
    color: rgb(var(--BUTTON_TEXT));
  }
`;
