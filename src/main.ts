import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const PORT = 3005;

    await app.listen(PORT, () => {
        Logger.log('Started');
    });
}
bootstrap();
