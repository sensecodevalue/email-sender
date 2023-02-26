import express from 'express';
import { Logger } from 'tslog';
import EmailSenderService from '../service/sender.service';

const logger = new Logger({name: "[TEMPLATE]_[SENDER_CONTROLLER]"});

class SenderController {
    public url = "/template/sender";
    public router = express.Router();
    private emailSenderService: EmailSenderService;

    constructor(emailSenderService: EmailSenderService) {
        this.emailSenderService = emailSenderService;
        this.snedByTemplateId();
        logger.debug("create SenderController");
    }

    async snedByTemplateId() {
        this.router.post('/:templateId', async (req, res) => {
            const templateId = req.params.templateId;
            const {to, unit = 1, templateArgs = {} } = req.body;

            // TEST: const to = new Array(20).fill("").map((_, index) => `meoyooniverse+${index + 1}@gmail.com`);
            // TEST: await this.emailSenderService.SendMailList({to, templateArgs: {name: "홍길동"}, template: {subject:"[테수트] 정대윤 테스트 {{name}}", html: `<h1>테스트를 해보겠다{{name}}~<h1>`}});
            try {
                await this.emailSenderService.SendMailList({to, templateArgs, templateId, unit});
                logger.debug(`[POST] send email to: ${to}, templateId: ${templateId}, unit: ${unit}`);
            } catch(error: any) {
                res.status(error.code || 500).json({message: error.message});
            }
            res.status(200).end();
        })
    }
}

export default SenderController;

// TODO: error 처리 https://typescript.tv/best-practices/error-ts1196-catch-clause-variable-type-annotation/
