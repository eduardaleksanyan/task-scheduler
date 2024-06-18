import { Injectable } from '@nestjs/common';
import config from './schema';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, any>;

  constructor() {
    this.envConfig = config.getProperties();
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  getConfig(): any {
    return this.envConfig;
  }
}
