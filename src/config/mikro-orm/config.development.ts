import { defineConfig } from '@mikro-orm/postgresql';
import configMain from './config.main';

export default defineConfig({
    ...configMain,
    dbName: 'nestjs-backend-dev',
    user: 'myuser',
    password: 'mypassword',
    host: 'localhost',
    debug: true,
});
