import { FindParams } from "./Model";
import { Service } from "./Service";

export class Controller {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  create(form: any) {
    return this.service.create(form);
  }

  find(params: FindParams) {
    return this.service.find(params);
  }

  findById(id: string | number) {
    return this.service.findById(id);
  }

  //update , delete
}
