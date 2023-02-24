import { Service } from "./Service";

/**
 * controller에서 service에 매칭되는 req를 수신하며, 사저처리이후, 서비스를 호출한다.
 * 이후, res를 던저 준다.
 */

export class Controller {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }
}
