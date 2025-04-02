import { CookieOptions } from 'express';

const options: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
};

export { options };
