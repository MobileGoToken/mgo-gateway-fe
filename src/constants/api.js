const env = process.env; // eslint-disable-line

const APP_PREFIX = 'MGO_';

export const API_URL: string = env[`${APP_PREFIX}API_URL`];

export const CLIENT_ID: string = env[`${APP_PREFIX}CLIENT_ID`];

export const CLIENT_PASS: string = env[`${APP_PREFIX}CLIENT_PASS`];

export const RECAPTCHA_KEY: string = env[`${APP_PREFIX}RECAPTCHA_KEY`];

export const HTTP_RETRY_REQUESTS: boolean = Boolean(
  env[`${APP_PREFIX}HTTP_RETRY_REQUESTS`],
);

export const HTTP_TIMEOUT: number = Number(env[`${APP_PREFIX}HTTP_TIMEOUT`]);

export const AUTH_COOKIE: string = '_ecAuthData';

export const TOKEN_ADDRESS: string = env[`${APP_PREFIX}TOKEN_ADDRESS`];

export const isProd = env.NODE_ENV === 'production';

export const TRANSFER_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    type: 'function',
  },
];
