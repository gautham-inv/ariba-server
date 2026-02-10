import { All, Controller, Req, Res } from '@nestjs/common';
import { auth } from './better-auth';
import { toNodeHandler } from 'better-auth/node';

@Controller('api/auth')
export class AuthController {
  @All('/*path')
  async handleAuth(@Req() req, @Res() res) {
    return toNodeHandler(auth)(req, res);
  }
}
