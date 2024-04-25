import { join } from 'path';
import { DataSource } from 'typeorm';
import config from '../config/configuration';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  username: config.dbConfig.username,
  password: config.dbConfig.password,
  database: config.dbConfig.databaseName,
  entities: [join(__dirname, '/../modules/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
});

export default dataSource;
