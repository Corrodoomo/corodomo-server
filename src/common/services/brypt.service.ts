import { ConfigService } from '@nestjs/config';
import { compareSync, hashSync } from 'bcrypt';

export class BryptService {
  constructor(private readonly configService: ConfigService) {}

  public async hashPassword(password: string): Promise<string> {
    const hash = await hashSync(password, this.configService.getOrThrow('BRYPT_SALT_OR_ROUNDS'));

    return hash;
  }

  public async compare(password: string, encrypted: string): Promise<boolean> {
    return compareSync(password, encrypted);
  }
}
