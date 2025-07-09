"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api', {
        exclude: ['/docs', '/docs/(.*)'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Book Management API')
        .setDescription('A comprehensive API for managing books with authentication')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Books', 'Book management operations')
        .addTag('Authentication', 'User authentication and authorization')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}/api`);
    logger.log(`Swagger documentation: http://localhost:${port}/docs`);
}
bootstrap().catch((error) => {
    console.error('Application failed to start:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map