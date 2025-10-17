import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { UsersRepository } from '@keuzekompas/domain';
import { USERS_REPOSITORY } from '@keuzekompas/domain';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly users: UsersRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    console.log('[Auth] login start', { email });
    const user = await this.users.findByEmail(email);
    if (!user) {
      console.warn('[Auth] user not found', { email });
      throw new UnauthorizedException('Ongeldige inlog');
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      console.warn('[Auth] password mismatch', { email });
      throw new UnauthorizedException('Ongeldige inlog');
    }
    console.log('[Auth] password valid', { email });

    // minimale user-claims
    const payload = { sub: String(user._id), email: user.email, sn: user.studentNumber };
    const accessToken = await this.jwt.signAsync(payload);

  console.log('[Auth] token generated', { email });

    // wat je naar frontend terugstuurt (geen passwordHash)
    return {
      accessToken,
      user: {
        id: String(user._id),
        email: user.email,
        studentNumber: user.studentNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
