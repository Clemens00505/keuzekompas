export interface UsersRepository {
  findByEmail(email: string): Promise<any | null> | any | null;
  findById(id: string): Promise<any | null> | any | null;
  updateById(id: string, update: Partial<{ firstName: string; lastName: string }>): Promise<any | null> | any | null;
}
