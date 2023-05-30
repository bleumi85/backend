import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { NODE_ENV } from 'src/common/constants';

import { configDev, configProd } from 'src/config/mikro-orm';

let options: Options<PostgreSqlDriver>;

switch (process.env.NODE_ENV) {
    case NODE_ENV.PRODUCTION:
        options = configProd;
        break;
    case NODE_ENV.DEVELOPMENT:
        options = configDev;
        break;
}

export default options;
