import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';


export const getJwtOptions = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('jwt.accessTokenSecret'),
  signOptions: {
    expiresIn: configService.get<StringValue>('jwt.accessTokenExpiresIn'),
    algorithm: 'HS256',
  },
});
