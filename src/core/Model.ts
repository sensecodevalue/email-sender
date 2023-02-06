export interface FindParams {
  length?: number;
  offset?: number;
}

export interface FindByIdParams {
  id?: number | string;
}

export abstract class Model<M> {
  model: M;

  constructor(model: M) {
    this.model = model;
  }

  abstract create(form: M): void;
  abstract find(params: FindByIdParams): M;
  abstract find(params: FindParams): M[];
  abstract update(id: number | string, form: M): M[];
  abstract delete(id: number | string): M[];
}
