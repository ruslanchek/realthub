/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import { useBreakpoint, IBreakpoint } from '../../hooks/useBreakpoint';

interface IProps {
  columns?: string[];
  breakpoints?: IBreakpoint<string[]>[];
  overrideGridGap?: number;
  overrideMargin?: number;
}

const getColumnsStyleString = (columns?: string[]): string => {
  let columnsStyleString = '';

  if (columns) {
    const columnsLength = columns.length;

    columns.forEach(column => {
      if (column.match('fr')) {
        columnsStyleString += `minmax(0, ${column}) `;
      } else {
        columnsStyleString += `calc(${column} - (var(--GRID_GAP_SIZE) - var(--GRID_GAP_SIZE) / ${columnsLength})) `;
      }
    });
  } else {
    columnsStyleString = '100%';
  }

  return columnsStyleString.trim();
};

export const Row: React.FC<IProps> = props => {
  const { columns, breakpoints, children } = props;
  let { overrideMargin = -Infinity, overrideGridGap = -Infinity } = props;
  const columnsBreakpointed = useBreakpoint(columns, breakpoints);
  const columnsStyleString = useMemo(
    () => getColumnsStyleString(columnsBreakpointed),
    [columnsBreakpointed],
  );

  return (
    <div
      css={[
        styles.root,
        css`
          grid-template-columns: ${columnsStyleString};
          margin-bottom: ${overrideMargin >= 0
            ? overrideMargin
            : 'var(--GRID_GAP_SIZE)'};
          grid-gap: ${overrideGridGap >= 0
            ? overrideGridGap
            : 'var(--GRID_GAP_SIZE)'};
        `,
      ]}
    >
      {children}
    </div>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-auto-rows: auto;
    width: 100%;
  `,
};
