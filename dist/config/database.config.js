"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const book_entity_1 = require("../books/entities/book.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const databaseConfig = async (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [book_entity_1.Book, user_entity_1.User],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    timezone: 'Z',
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map