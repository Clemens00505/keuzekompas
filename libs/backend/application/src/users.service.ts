import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UsersRepository } from '@keuzekompas/domain';
import { USERS_REPOSITORY } from '@keuzekompas/domain';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private readonly users: UsersRepository) {}

  async getById(id: string) {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('Gebruiker niet gevonden');
    return this.toSafeUser(user);
  }

  async updateProfile(id: string, input: { firstName?: string; lastName?: string }) {
    const updated = await this.users.updateById(id, {
      ...(input.firstName !== undefined ? { firstName: input.firstName } : {}),
      ...(input.lastName !== undefined ? { lastName: input.lastName } : {}),
    });
    if (!updated) throw new NotFoundException('Gebruiker niet gevonden');
    return this.toSafeUser(updated);
  }

  private toSafeUser(user: any) {
    return {
      id: String(user._id),
      email: user.email,
      studentNumber: user.studentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
