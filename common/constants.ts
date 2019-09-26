export const PATHS = {
  HOME: '/',
  ME: '/me',
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
