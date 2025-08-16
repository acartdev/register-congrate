export class ListService {
  async getList(query: string) {
    const result = await fetch(`/api/lists?q=${query}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.json();
  }
}
