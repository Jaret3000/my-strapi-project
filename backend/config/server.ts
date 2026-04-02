import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  
  transfer: {
    // @ts-ignore
    enabled: true,
    // @ts-ignore
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});

export default config;
