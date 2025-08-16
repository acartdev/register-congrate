import { ListsRepository } from '../repository/lists.repository';

export class ListService {
  async getLists(search: string, userID: number = -1) {
    const repository = new ListsRepository();
    if (userID !== -1) {
      return await repository.findByUserID(search, userID);
    } else {
      return await repository.findAll(search);
    }
  }
}
