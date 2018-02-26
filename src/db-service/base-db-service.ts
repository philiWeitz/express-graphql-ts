
export default abstract class BaseDbModel<T> {

  model: any;


  constructor(model: any) {
    this.model = model;
  }

  getAll() : Promise<T[]> {
    return this.model.query();
  }

  getById(id) : Promise<T|null> {
    return this.model.query().findById(id);
  }

  insertAndFetch(data : T) : Promise<T|null> {
    return this.model.query().insertAndFetch(data);
  }

  patchAndFetchById(id, data) : Promise<T|null> {
    return this.model.query().patchAndFetchById(id, data);
  }

  async deleteById(id: number) : Promise<T|null> {
    const deleted: T[] = await this.model.query().delete().where({ id }).returning('*');
    return (deleted && deleted.length > 0) ? deleted[0] : null;
  }
}
