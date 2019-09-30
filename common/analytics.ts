import ReactGA from 'react-ga';

export const initGA = () => {
  if (
    !(window as any).GA_INITIALIZED &&
    process.env.NODE_ENV === 'production'
  ) {
    ReactGA.initialize(process.env.GA_CODE || '');
    (window as any).GA_INITIALIZED = true;
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category = '', action = '') => {
  if (category && action && process.env.NODE_ENV === 'production') {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description && process.env.NODE_ENV === 'production') {
    ReactGA.exception({ description, fatal });
  }
};
