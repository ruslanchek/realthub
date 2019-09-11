import ReactGA from 'react-ga';

export const initGA = () => {
  if (!(window as any).GA_INITIALIZED) {
    initGA();
    (window as any).GA_INITIALIZED = true;
  }

  ReactGA.initialize('UA-147616047-1');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
