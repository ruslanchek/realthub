const COOKIE_DAYS = 365;

export const setCookie = (name: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value ||
    ''}; expires=${date.toUTCString()}; path=/`;
};

export const getCookie = (name: string): string | undefined => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return undefined;
};

export const eraseCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};
