import Color from 'color';

export enum ETheme {
  Dark = 'Dark',
  Light = 'Light',
}

export interface ITheme {
  BREAKPOINTS: {
    MOBILE_MIN: number;
    MOBILE_MAX: number;
    DESKTOP_MIN: number;
    DESKTOP_MAX: number;
  };

  CONSTANTS: {
    FONT_FAMILY: string;
    GLOBAL_LINE_HEIGHT: string;

    INPUT_HEIGHT_TINY: string;
    INPUT_HEIGHT_SMALL: string;
    INPUT_HEIGHT_LARGE: string;

    INPUT_SIDE_PADDING: string;

    BORDER_RADIUS_TINY: string;
    BORDER_RADIUS_SMALL: string;
    BORDER_RADIUS_LARGE: string;

    GRID_GAP_SIZE: string;

    FONT_SIZE_LARGE: string;
    FONT_SIZE_MEDIUM: string;
    FONT_SIZE_BASE: string;
    FONT_SIZE_SMALL: string;
    FONT_SIZE_TINY: string;

    SCROLLBAR_TRACK_SIZE: string;

    TOOLTIP_TRIANGLE_WIDTH: string;

    ELEVATION_SHADOW_1: string;
    ELEVATION_SHADOW_2: string;
    ELEVATION_SHADOW_3: string;
  };

  COLORS: {
    WHITE: Color;

    BACKGROUND: Color;
    BACKGROUND_DARK: Color;

    TEXT: Color;
    TEXT_ACCENT: Color;
    TEXT_ACTIVE: Color;
    TEXT_ACTIVE_INTERACTED: Color;
    TEXT_FADED: Color;

    ELEMENT_BG: Color;
    ELEMENT_BG_ACCENT: Color;
    ELEMENT_BORDER: Color;
    ELEMENT_SEPARATOR: Color;

    INPUT_BG: Color;
    INPUT_BG_ACCENT: Color;
    INPUT_BG_ACTIVE: Color;
    INPUT_BG_ERROR: Color;

    INPUT_BORDER: Color;
    INPUT_BORDER_ACCENT: Color;
    INPUT_BORDER_ACTIVE: Color;
    INPUT_BORDER_ERROR: Color;

    BUTTON_TEXT: Color;
    BUTTON_DEFAULT: Color;
    BUTTON_SUCCESS: Color;
    BUTTON_ACCENT: Color;
    BUTTON_FADED: Color;
    BUTTON_DANGER: Color;
    BUTTON_FACEBOOK: Color;
    BUTTON_GOOGLE: Color;

    PLACEHOLDER: Color;

    SCROLLBAR_TRACK: Color;
    SCROLLBAR_THUMB: Color;
    SCROLLBAR_THUMB_HOVER: Color;
  };
}

export const themeDark: ITheme = {
  BREAKPOINTS: {
    MOBILE_MIN: 0,
    MOBILE_MAX: 700,
    DESKTOP_MIN: 701,
    DESKTOP_MAX: 99999,
  },

  CONSTANTS: {
    FONT_FAMILY:
      '-apple-system, BlinkMacSystemFont, Roboto, Open Sans, Helvetica Neue, sans-serif',
    GLOBAL_LINE_HEIGHT: '1.5',

    INPUT_HEIGHT_TINY: '25px',
    INPUT_HEIGHT_SMALL: '35px',
    INPUT_HEIGHT_LARGE: '38px',

    INPUT_SIDE_PADDING: '12px',

    BORDER_RADIUS_TINY: '2px',
    BORDER_RADIUS_SMALL: '4px',
    BORDER_RADIUS_LARGE: '6px',

    GRID_GAP_SIZE: '20px',

    FONT_SIZE_LARGE: '24px',
    FONT_SIZE_MEDIUM: '18px',
    FONT_SIZE_BASE: '14px',
    FONT_SIZE_SMALL: '12px',
    FONT_SIZE_TINY: '10px',

    SCROLLBAR_TRACK_SIZE: '5px',

    TOOLTIP_TRIANGLE_WIDTH: '7px',

    ELEVATION_SHADOW_1: '0 1px 5px 0 rgba(0, 0, 0, 0.15)',
    ELEVATION_SHADOW_2: '0 2px 10px rgba(0, 0, 0, 0.15)',
    ELEVATION_SHADOW_3: '0 5px 10px rgba(0, 0, 0, 0.15)',
  },

  COLORS: {
    WHITE: Color('#fff'),

    BACKGROUND: Color('#232b3e'),
    BACKGROUND_DARK: Color('#1c2233'),

    TEXT: Color('#BCC2D7'),
    TEXT_ACCENT: Color('#fff'),
    TEXT_ACTIVE: Color('#2294e6'),
    TEXT_ACTIVE_INTERACTED: Color('#44adff'),
    TEXT_FADED: Color('#7d8da1'),

    ELEMENT_BG: Color('#2c3750'),
    ELEMENT_BG_ACCENT: Color('#222b3d'),
    ELEMENT_BORDER: Color('#2f3b51'),
    ELEMENT_SEPARATOR: Color('#222b3d'),

    INPUT_BG: Color('#222c40'),
    INPUT_BG_ACCENT: Color('#2b3548'),
    INPUT_BG_ACTIVE: Color('#1c2639'),
    INPUT_BG_ERROR: Color('#a13e66'),

    INPUT_BORDER: Color('#2f3b51'),
    INPUT_BORDER_ACCENT: Color('#444f65'),
    INPUT_BORDER_ACTIVE: Color('#259af3'),
    INPUT_BORDER_ERROR: Color('#a13e66'),

    BUTTON_TEXT: Color('#fff'),
    BUTTON_DEFAULT: Color('#2294e6'),
    BUTTON_SUCCESS: Color('#04be7f'),
    BUTTON_ACCENT: Color('#6439e5'),
    BUTTON_FADED: Color('#3e4859'),
    BUTTON_DANGER: Color('#803338'),
    BUTTON_FACEBOOK: Color('#1774ec'),
    BUTTON_GOOGLE: Color('#ffffff'),

    PLACEHOLDER: Color('#7d8da1'),

    SCROLLBAR_TRACK: Color('#2b3548'),
    SCROLLBAR_THUMB: Color('#4b576c'),
    SCROLLBAR_THUMB_HOVER: Color('#475266'),
  },
};

export const themeLight: ITheme = {
  BREAKPOINTS: {
    MOBILE_MIN: 0,
    MOBILE_MAX: 700,
    DESKTOP_MIN: 701,
    DESKTOP_MAX: 99999,
  },

  CONSTANTS: {
    FONT_FAMILY:
      '-apple-system, BlinkMacSystemFont, Roboto, Open Sans, Helvetica Neue, sans-serif',

    GLOBAL_LINE_HEIGHT: '1.5',

    INPUT_HEIGHT_TINY: '25px',
    INPUT_HEIGHT_SMALL: '35px',
    INPUT_HEIGHT_LARGE: '38px',

    INPUT_SIDE_PADDING: '12px',

    BORDER_RADIUS_TINY: '2px',
    BORDER_RADIUS_SMALL: '4px',
    BORDER_RADIUS_LARGE: '6px',

    GRID_GAP_SIZE: '20px',

    FONT_SIZE_LARGE: '24px',
    FONT_SIZE_MEDIUM: '18px',
    FONT_SIZE_BASE: '14px',
    FONT_SIZE_SMALL: '12px',
    FONT_SIZE_TINY: '10px',

    SCROLLBAR_TRACK_SIZE: '5px',

    TOOLTIP_TRIANGLE_WIDTH: '7px',

    ELEVATION_SHADOW_1: '0 1px 5px 0 rgba(0, 0, 0, 0.15)',
    ELEVATION_SHADOW_2: '0 2px 10px rgba(0, 0, 0, 0.15)',
    ELEVATION_SHADOW_3: '0 5px 10px rgba(0, 0, 0, 0.15)',
  },

  COLORS: {
    WHITE: Color('#fff'),

    BACKGROUND: Color('#fff'),
    BACKGROUND_DARK: Color('#eaeff6'),

    TEXT: Color('#64729e'),
    TEXT_ACCENT: Color('#3c4d86'),
    TEXT_ACTIVE: Color('#367cff'),
    TEXT_ACTIVE_INTERACTED: Color('#649aff'),
    TEXT_FADED: Color('#9ea2b2'),

    ELEMENT_BG: Color('#ffffff'),
    ELEMENT_BG_ACCENT: Color('#f6f7fd'),
    ELEMENT_BORDER: Color('#eff0f4'),
    ELEMENT_SEPARATOR: Color('#f6f7fd'),

    INPUT_BG: Color('#ffffff'),
    INPUT_BG_ACCENT: Color('#f6f7fd'),
    INPUT_BG_ACTIVE: Color('#eff0f4'),
    INPUT_BG_ERROR: Color('#fe7364'),

    INPUT_BORDER: Color('#eff0f4'),
    INPUT_BORDER_ACCENT: Color('#c7cad9'),
    INPUT_BORDER_ACTIVE: Color('#367cff'),
    INPUT_BORDER_ERROR: Color('#fe7364'),

    BUTTON_TEXT: Color('#fff'),
    BUTTON_DEFAULT: Color('#367cff'),
    BUTTON_SUCCESS: Color('#04be7f'),
    BUTTON_ACCENT: Color('#6439e5'),
    BUTTON_FADED: Color('#9ea2b2'),
    BUTTON_DANGER: Color('#fe7364'),
    BUTTON_FACEBOOK: Color('#1774ec'),
    BUTTON_GOOGLE: Color('#f8f8f8'),

    PLACEHOLDER: Color('#d2d5e1'),

    SCROLLBAR_TRACK: Color('#DCE4EF'),
    SCROLLBAR_THUMB: Color('#B6C6DB'),
    SCROLLBAR_THUMB_HOVER: Color('#C6D4E6'),
  },
};
