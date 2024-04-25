import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import config from '../config/configuration';

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  username: config.dbConfig.username,
  password: config.dbConfig.password,
  database: config.dbConfig.databaseName,
  entities: [join(__dirname, '/../modules/**/*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
};
export default dbConfig;