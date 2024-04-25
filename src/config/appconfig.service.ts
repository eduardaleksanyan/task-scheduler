import { Injectable } from '@nestjs/common';
import configuration from './configuration';

@Injectable()
export class AppconfigService {
  getConfig() {
    return configuration;
  }
}
