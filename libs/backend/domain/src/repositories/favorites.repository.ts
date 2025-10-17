export interface FavoritesRepository {
  listByUser(userId: string): Promise<any[]> | any[];
  add(userId: string, moduleId: string): Promise<any> | any;
  remove(userId: string, moduleId: string): Promise<void> | void;
}
