export interface FindParams {
  length: number;
  offset: number;
  ids?: FindByIdParam[];
  state?: string;
}

export type FindByIdParam = number | string;

interface InterfaceModal<M> {
  create?: (form: M) => M;
  findById?: (id: FindByIdParam) => M;
  find?: (params: FindParams) => M[];
  update?: (id: FindByIdParam, form: Partial<Omit<M, "id">>) => M;
  delete?: (id: FindByIdParam) => M;
}

export abstract class Model<M> implements InterfaceModal<M> {
  #dao: unknown;
  constructor(dao: unknown) {
    this.#dao = dao;
  }

  abstract create(form: M): M;
  abstract findById(id: FindByIdParam): M;
  abstract find(params: FindParams): M[];
  abstract update(id: FindByIdParam, form: Partial<Omit<M, "id">>): M;
  abstract delete(id: FindByIdParam): M;
}
