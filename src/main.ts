import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NODE_ENV } from './common/constants';
import { setupSwagger } from './utils';

const corsLogger = new Logger('CORS');

const whiteList = [];
const regexList = [];

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('port');
    const CURRENT_NODE_ENV = configService.get<string>('node_env');
    const showSwagger = configService.get<boolean>('show_swagger');

    app.enableCors({
        credentials: true,
        origin: (origin, callback) => {
            if (origin === undefined) {
                corsLogger.log('No origin');
                callback(null, true);
            } else if (whiteList.indexOf(origin) !== -1) {
                corsLogger.log(`WhiteList: ${origin}`);
                callback(null, true);
            } else if (regexList.some((regex) => regex.test(origin))) {
                corsLogger.log(`RegexList: ${origin}`);
                callback(null, true);
            } else {
                corsLogger.error('Not allowed by CORS');
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    if (CURRENT_NODE_ENV === NODE_ENV.DEVELOPMENT || showSwagger) {
        Logger.log('Setup', 'Swagger');
        setupSwagger(app);
    }

    await app.listen(PORT, () => {
        switch (CURRENT_NODE_ENV) {
            case NODE_ENV.PRODUCTION: {
                Logger.log(`Application running on port ${PORT}`, 'Web-Production');
                break;
            }
            case NODE_ENV.DEVELOPMENT: {
                Logger.log(`http://localhost:${PORT}`, 'Web-Development');
                break;
            }
            default: {
                Logger.error('Environment not found', 'Web-Unknown');
            }
        }
    });
}
bootstrap();
