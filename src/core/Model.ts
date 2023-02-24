export interface FindParams {
  length: number;
  offset: number;
  ids?: FindByIdParam[];
  state?: string;
}

export type FindByIdParam = number | string;

interface InterfaceModal<M> {
  dao: unknown;
  create?: (form: M) => M;
  findById?: (id: FindByIdParam) => M;
  find?: (params: FindParams) => M[];
  update?: (id: FindByIdParam, form: Partial<Omit<M, "id">>) => M;
  delete?: (id: FindByIdParam) => M;
}

export abstract class Model<M> implements InterfaceModal<M> {
  dao: unknown;
  constructor(dao: unknown) {
    this.dao = dao;
  }

  abstract create(form: M): M;
  abstract findById(id: FindByIdParam): M;
  abstract find(params: FindParams): M[];
  abstract update(id: FindByIdParam, form: Partial<Omit<M, "id">>): M;
  abstract delete(id: FindByIdParam): M;
}

interface IM1 {}

class M1 extends Model<IM1> {
  constructor(dao: unknown) {
    super(dao);
  }

  create(form: IM1) {
    // this.dao.create(form);
    return { name: "1", age: 1 };
  }
  find(params: FindParams) {
    // this.dao.find(params);
    return [{ name: "1", age: 1 }];
  }
  findById(id: FindByIdParam) {
    // this.dao.findById(id);
    return { name: "1", age: 1 };
  }

  update(id: FindByIdParam, form: Partial<Omit<IM1, "id">>) {
    // this.dao.update(id, form);
    return { name: "1", age: 1 };
  }

  delete(id: FindByIdParam) {
    // this.dao.delete(id);
    return { name: "1", age: 1 };
  }
}
