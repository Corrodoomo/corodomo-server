import { Injectable } from '@nestjs/common';
import * as packageJson from 'packageJson';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    const name = packageJson.name;
    const version = packageJson.version;
    return `${name} v${version}`;
  }
}
