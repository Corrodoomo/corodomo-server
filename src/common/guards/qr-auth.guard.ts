import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class QRAuthGuard extends AuthGuard('qr-code') {}
