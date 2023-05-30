import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { NODE_ENV } from './common/constants';

import { configDev, configProd } from './config/mikro-orm';

let options: Options<PostgreSqlDriver>;

switch (process.env.NODE_ENV) {
    case NODE_ENV.PRODUCTION:
        options = configProd;
        break;
    case NODE_ENV.DEVELOPMENT:
        options = configDev;
        break;
    default:
        throw new Error('No MirkoORM config found');
}

export default options;
