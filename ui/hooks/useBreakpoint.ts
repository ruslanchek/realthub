import { useMemo } from 'react';
import { useScreenSizeChanged } from './useScreenSizeChanged';
import { getCssVariableNumberMemoized } from '../common/utils';

type TPreset = 'mobile' | 'desktop';

interface EPreset {
  min: number;
  max: number;
}

export interface IBreakpoint<T> {
  preset: TPreset | EPreset;
  value: T;
}

const DEFAULT_THROTTLE_TIME = 200;

const calculateValue = <T>(
  defaultValue: T,
  breakpoints: IBreakpoint<T>[] | undefined,
  width: number,
): T => {
  let currentBreakpoint: IBreakpoint<T> | null = null;

  if (breakpoints) {
    for (let i = 0, l = breakpoints.length; i < l; i++) {
      const breakpoint = breakpoints[i];

      if (typeof breakpoint.preset === 'string') {
        let min = -Infinity;
        let max = Infinity;

        switch (breakpoint.preset) {
          case 'mobile': {
            min = getCssVariableNumberMemoized('--MOBILE_MIN');
            max = getCssVariableNumberMemoized('--MOBILE_MAX');
            break;
          }

          case 'desktop':
          default: {
            min = getCssVariableNumberMemoized('--DESKTOP_MIN');
            max = getCssVariableNumberMemoized('--DESKTOP_MAX');
            break;
          }
        }

        if (width >= min && width <= max) {
          currentBreakpoint = breakpoint;
          break;
        }
      } else if (
        typeof breakpoint.preset === 'object' &&
        breakpoint.preset.min >= 0 &&
        breakpoint.preset.max >= 0
      ) {
        if (width >= breakpoint.preset.min && width <= breakpoint.preset.max) {
          currentBreakpoint = breakpoint;
          break;
        }
      }
    }
  }

  if (currentBreakpoint) {
    return currentBreakpoint.value;
  } else {
    return defaultValue;
  }
};

export const useBreakpoint = <T = any>(
  defaultValue: T,
  breakpoints: IBreakpoint<T>[] | undefined,
  throttleTime: number = DEFAULT_THROTTLE_TIME,
): T | undefined => {
  const screenSize = useScreenSizeChanged(throttleTime);

  return useMemo(() => {
    return calculateValue<T>(defaultValue, breakpoints, screenSize.width);
  }, [defaultValue, breakpoints, screenSize.width]);
};
