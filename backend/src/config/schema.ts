import * as convict from 'convict';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
dotenv.config({ path: path.join(__dirname, `../../${environment}.env`) });

const config = convict({
  port: {
    doc: 'Port to run the service on',
    env: 'PORT',
    format: 'port',
    default: 3001,
  },
  env: {
    doc: 'Node environment',
    env: 'NODE_ENV',
    format: ['production', 'development'],
    default: '',
  },
  mongo: {
    host: {
      doc: 'MongoDB host name/IP',
      format: String,
      default: 'localhost',
      env: 'MONGO_HOST',
    },
    port: {
      doc: 'MongoDB port',
      format: 'port',
      default: 27017,
      env: 'MONGO_PORT',
    },
    dbName: {
      doc: 'MongoDB database name',
      format: String,
      default: 'tasksDB',
      env: 'MONGO_DB_NAME',
    },
    uri: {
      doc: 'MongoDB connection URI',
      format: String,
      default: '',
      env: 'MONGO_URI',
      derived: true,
    },
  },
  redis: {
    host: {
      doc: 'Redis host name/IP',
      format: String,
      default: 'localhost',
      env: 'REDIS_HOST',
    },
    port: {
      doc: 'Redis port',
      format: 'port',
      default: 6379,
      env: 'REDIS_PORT',
    },
  },
});

config.set(
  'mongo.uri',
  `mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.dbName')}`,
);

config.validate({ allowed: 'strict' });

export default config;
