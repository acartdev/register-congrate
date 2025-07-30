export const setCookie = (
  key: string,
  value: string | number,
  exdays: number,
): void => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + currentDate.toUTCString();
  document.cookie = key + '=' + value + ';' + expires + ';path=/';
};

export const getCookie = (cname: string): string => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const deleteCookie = (name: string): void => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
