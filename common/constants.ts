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
