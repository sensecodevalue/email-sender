import express, { Router } from "express";

import { Logger } from 'tslog';

const logger = new Logger({name: "[APP]"})

class Server {
    public app: express.Application;
    
    constructor() {
        this.app = express();
    }

    useController(controller: {url: string, router: Router}) {
        this.app.use(controller.url, controller.router);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            logger.debug(`Server is listening on PORT: ${process.env.PORT}`)
        });   
    }
}

export default Server;


