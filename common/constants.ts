import { ITheme, themeLight } from '../ui/module';
import Color from 'color';

export const PATHS = {
  HOME: '/',
  ME: '/me',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
};

export const API_URLS = {
  AUTH_LOGIN: `${process.env.API_URL}/auth/login`,
  AUTH_REGISTER: `${process.env.API_URL}/auth/register`,
  AUTH_ME: `${process.env.API_URL}/auth/me`,
  PROPERTY_LIST: `${process.env.API_URL}/property`,
  PROPERTY_ITEM: `${process.env.API_URL}/property/:id`,
};

export const CONFIG = {
  DEFAULT_TITLE: 'Realthub',
  DEFAULT_DESCRIPTION: '',

  MODALS_PORTAL_ROOT_ID: 'modalsPortalRoot',
  NOTIFICATIONS_PORTAL_ROOT_ID: 'notificationsPortalRoot',
  TOOLTIPS_PORTAL_ROOT_ID: 'tooltipsPortalRoot',
};

export const COOKIES_SETTINGS = {
  domain: process.env.BASE_DOMAIN,
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  path: '/',
};

export const UI_THEME: ITheme = {
  BREAKPOINTS: {
    ...themeLight.BREAKPOINTS,
  },

  CONSTANTS: {
    ...themeLight.CONSTANTS,
    FONT_FAMILY: "'Source Sans Pro', sans-serif;",
    GLOBAL_LINE_HEIGHT: '1.3',

    FONT_SIZE_BASE: '15px',
    FONT_SIZE_MEDIUM: '19px',
    FONT_SIZE_LARGE: '25px',
    FONT_SIZE_SMALL: '14px',

    BORDER_RADIUS_LARGE: '8px',
    BORDER_RADIUS_SMALL: '6px',
    BORDER_RADIUS_TINY: '4px',

    ELEVATION_SHADOW_1: '0 2px 6px 0 rgba(0, 0, 0, 0.085)',
    ELEVATION_SHADOW_2: '0 4px 12px rgba(0, 0, 0, 0.075)',
    ELEVATION_SHADOW_3: '0 15px 45px rgba(0, 0, 0, 0.085)',
  },

  COLORS: {
    ...themeLight.COLORS,
    TEXT_ACTIVE: Color('#0065ff'),
    TEXT: Color('#253858'),
    BUTTON_DEFAULT: Color('#0065ff'),
  },
};
