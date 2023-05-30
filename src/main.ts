import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './common/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('port');
    const CURRENT_NODE_ENV = configService.get<string>('node_env');

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
