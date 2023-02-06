import { FindParams, Model } from "./Model";

export abstract class Service {
  model: Model<unknown>;

  constructor(model: Model<unknown>) {
    this.model = model;
  }

  create(form: unknown) {
    return this.model.create(form);
  }

  find(params: FindParams) {
    return this.model.find(params);
  }

  findById(id: string | number) {
    return this.model.find({ id });
  }
}
