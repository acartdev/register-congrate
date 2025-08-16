import { ListsRepository } from '../repository/lists.repository';

export class ListService {
  private listsRepository: ListsRepository;

  constructor() {
    this.listsRepository = new ListsRepository();
  }

  async getLists(search: string, userID: number = -1) {
    if (userID !== -1) {
      return await this.listsRepository.findByUserID(search, userID);
    } else {
      return await this.listsRepository.findAll(search);
    }
  }
}
