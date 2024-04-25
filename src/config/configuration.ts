import * as convict from 'convict';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
dotenv.config({ path: path.join(__dirname, `../../${environment}.env`) });

const convictSchema = convict({
  port: {
    doc: 'Port to run the service on',
    env: 'PORT',
    format: 'port',
    default: 3000,
  },
  env: {
    doc: 'Node environment',
    env: 'NODE_ENV',
    default: '',
  },
  dbConfig: {
    host: {
      doc: 'Postgres host',
      env: 'DB_HOST',
      default: 'localhost',
    },
    port: {
      doc: 'Postgres port',
      env: 'DB_PORT',
      format: 'port',
      default: 5432,
    },
    username: {
      doc: 'Postgres username',
      env: 'DB_USERNAME',
      default: '',
    },
    password: {
      doc: 'Postgres password',
      env: 'DB_PASSWORD',
      default: '',
    },
    databaseName: {
      doc: 'Postgres database name',
      env: 'DB_NAME',
      default: '',
    },
  },
});

convictSchema.validate({ allowed: 'strict' });
export default convictSchema.getProperties();
