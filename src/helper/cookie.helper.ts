interface CookieOptions {
  expires?: number; // days
  maxAge?: number; // seconds
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  key: string,
  value: string | number,
  exdays: number,
  options?: CookieOptions,
): void => {
  if (typeof window === 'undefined') return; // Skip on server-side

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + exdays * 24 * 60 * 60 * 1000);

  let cookieString = `${key}=${value}`;

  if (options?.expires || exdays) {
    const expireDate = options?.expires
      ? new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000)
      : currentDate;
    cookieString += `; expires=${expireDate.toUTCString()}`;
  }

  if (options?.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  cookieString += `; path=${options?.path || '/'}`;

  if (options?.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options?.secure || process.env.NODE_ENV === 'production') {
    cookieString += '; secure';
  }

  if (options?.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  } else {
    cookieString += '; samesite=lax';
  }

  document.cookie = cookieString;
};

export const getCookie = (cname: string): string => {
  if (typeof window === 'undefined') return ''; // Skip on server-side

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

export const deleteCookie = (
  name: string,
  options?: Pick<CookieOptions, 'domain' | 'path'>,
): void => {
  if (typeof window === 'undefined') return; // Skip on server-side

  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  cookieString += `; path=${options?.path || '/'}`;

  if (options?.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  document.cookie = cookieString;
};

// Server-side cookie functions for API routes
export const getServerCookie = (
  cookieHeader: string | undefined,
  name: string,
): string => {
  if (!cookieHeader) return '';

  const cookies = cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[name] || '';
};

export const setServerCookie = (
  name: string,
  value: string,
  options?: CookieOptions,
): string => {
  let cookieString = `${name}=${value}`;

  if (options?.maxAge) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }

  if (options?.expires) {
    const expireDate = new Date(
      Date.now() + options.expires * 24 * 60 * 60 * 1000,
    );
    cookieString += `; Expires=${expireDate.toUTCString()}`;
  }

  cookieString += `; Path=${options?.path || '/'}`;

  if (options?.domain) {
    cookieString += `; Domain=${options.domain}`;
  }

  if (options?.secure || process.env.NODE_ENV === 'production') {
    cookieString += '; Secure';
  }

  if (options?.httpOnly) {
    cookieString += '; HttpOnly';
  }

  if (options?.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  } else {
    cookieString += '; SameSite=Lax';
  }

  return cookieString;
};
