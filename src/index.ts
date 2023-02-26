import "./lib/common/env";

import bodyParser from 'body-parser';

import Server from './core/Server';
import TemplateModule from "./apps/template/module/template.module";
import ReceiversModule from './apps/receivers/module/receivers.module';

const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: false }));

server.useController(ReceiversModule.receiversController);
server.useController(TemplateModule.senderController);

server.listen();