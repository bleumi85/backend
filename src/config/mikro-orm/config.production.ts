import { defineConfig } from '@mikro-orm/postgresql';
import configMain from './config.main';

export default defineConfig({
    ...configMain,
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    debug: true,
    driverOptions: {
        connection: { ssl: true },
    },
    cache: {
        enabled: false,
    },
});
