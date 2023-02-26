import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Queue from 'bee-queue';
import { EmailSenderInterface, SendMailByTemplateIdProps, SendMailByTemplateProps, SendMailListBaseProps, SendMailListProps } from '../types/template.types';
import { Logger } from 'tslog';
import TemplateModel from '../model/template.model';

const logger = new Logger({ name: "[TEMPLATE]_[EMAIL_SERVICE]" });

class EmailSenderService implements EmailSenderInterface {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    private emailQueue: Queue<SendMailListBaseProps>;
    private templateModel: TemplateModel;

    constructor(transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>, emailQueue: Queue<SendMailListBaseProps>, templateModel: TemplateModel) {   
        this.transporter = transporter;
        this.emailQueue = emailQueue;
        this.templateModel = templateModel;

        this.queueProcess();
        logger.debug("create Service");
    }

    async sendMailByTemapalte({to, template}:SendMailByTemplateProps) {
        const mailOptions = {
          from: process.env.EMAIL_SENDER,
          to: process.env.EMAIL_SENDER,
          bcc: to,
          subject: template.subject,
          html: template.html,
          text: template.text
        }
    
        return await this.transporter.sendMail(mailOptions)
    }

    // REMOVE: 이거 필요없음 제거
    async sendMailByTemplateId({to, templateId}: SendMailByTemplateIdProps) { 
        const template = {subject: '', html: '', text: ''}; // template model가져다가 사용하기
        
        return await this.sendMailByTemapalte({to, template});
    }

    async SendMailList(props: SendMailListProps) {
        const {to, unit = 1} = props;
        const emailBunbleList = divideList(to, unit);  
        let templateById;
        
        if('templateId' in props) {
            const data = await this.templateModel.findById(props.templateId);
            templateById = data;
        }

        emailBunbleList.forEach(emailBunble => {
            const generatedTemplate = this.templateModel.generate(templateById || props.template, props.templateArgs);
            if('template' in props) this.emailQueue.createJob<SendMailListBaseProps>({to: emailBunble, template: generatedTemplate}).save().then((job) => {
                logger.debug(
                    `[save job] emailQueue Job ${job.id} emails: ${job.data.to} template: ${job.data.template.html}`
                );
            });
        });
    }

    queueProcess() {
        this.emailQueue.process(async (job) => {
            const {to, template = null, templateId = null, templateArgs = {}} = job.data;
            logger.debug("[emailQueue process done]", JSON.stringify({to, template , templateId}));
            // TEST: const res = await delay(job.data.to);
             const res = await this.sendMailByTemapalte({to, template});
            
            logger.debug("[emailQueue process res]", res);
            // TODO: 여기서 receivers model들고와서 업데이트 success faile한번 시켜주던지 아니면 model에서 emailFail한번 실행 시켜주자.
        });   
    }

    // TEST
    async callTest() {
        const res = await this.sendMailByTemapalte({to: "meoyooniverse@gmail.com", template: {subject:"[테수트] 정대윤 테스트", html: `<h1>테스트를 해보겠다~<h1>`}});
    }

    // TEST
    async callListTest() {
        logger.debug('callListTest');

        const emailList = new Array(100).fill("").map((_, index) => `meoyooniverse+${index + 1}@gmail.com`);

        await this.SendMailList({to: emailList, template: {subject:"[테수트] 정대윤 테스트", html: `<h1>테스트를 해보겠다~<h1>`}});
    }
}

export default EmailSenderService;

const divideList = (list: string[], unit:number) => {
    const newList: string[][] = [];

    for (let i = 0; i < list.length; i += unit) {
        newList.push(list.slice(i, i + unit));
    }

    return newList;
}

// LINK: https://alphahackerhan.tistory.com/39 erd 설계